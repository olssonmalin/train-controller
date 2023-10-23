import EventSource from 'eventsource';
import fetch from 'node-fetch';

async function fetchTrainPositions(io) {
    const sseurl = await fetchSSEUrl();
    if (!sseurl) {
        console.error('Failed to fetch SSE URL');
        return;
    }

    const eventSource = createEventSource(sseurl);

    eventSource.onopen = () => {
        console.log('Connection to server opened.');
    };

    io.on('connection', () => {
        console.log('A user connected (Train Positions)');

        eventSource.onmessage = (e) => {
            try {
                handlePositionUpdate(io, e.data);
            } catch (err) {
                console.error(err);
            }
        };
    });

    eventSource.onerror = (e) => {
        console.error('EventSource failed.', e);
    };
}

async function fetchSSEUrl() {
    const query = `<REQUEST>
    <LOGIN authenticationkey="${process.env.TRAFIKVERKET_API_KEY}" />
    <QUERY sseurl="true" namespace="järnväg.trafikinfo" objecttype="TrainPosition" schemaversion="1.0" limit="1" />
  </REQUEST>`;

    const response = await fetch(
        'https://api.trafikinfo.trafikverket.se/v2/data.json',
        {
            method: 'POST',
            body: query,
            headers: { 'Content-Type': 'text/xml' },
        },
    );

    const result = await response.json();
    return result.RESPONSE.RESULT[0].INFO.SSEURL;
}

function createEventSource(sseurl) {
    return new EventSource(sseurl);
}

function handlePositionUpdate(io, data) {
    const parsedData = JSON.parse(data);

    if (parsedData) {
        const changedPosition = parsedData.RESPONSE.RESULT[0].TrainPosition[0];
        const matchCoords = /(\d*\.\d+|\d+),?/g;
        const position = changedPosition.Position.WGS84.match(matchCoords)
            .map((t) => parseFloat(t))
            .reverse();

        const trainObject = {
            trainnumber: changedPosition.Train.AdvertisedTrainNumber,
            position: position,
            timestamp: changedPosition.TimeStamp,
            bearing: changedPosition.Bearing,
            status: !changedPosition.Deleted,
            speed: changedPosition.Speed,
        };

        io.emit('message', trainObject);
    }
}

export default fetchTrainPositions;
