import 'node-fetch';

const codesService = {
    fetchCodes: async () => {
        const query = `<REQUEST>
                  <LOGIN authenticationkey="${process.env.TRAFIKVERKET_API_KEY}" />
                  <QUERY objecttype="ReasonCode" schemaversion="1">
                        <INCLUDE>Code</INCLUDE>
                        <INCLUDE>Level1Description</INCLUDE>
                        <INCLUDE>Level2Description</INCLUDE>
                        <INCLUDE>Level3Description</INCLUDE>
                  </QUERY>
            </REQUEST>`;

        const response = await fetch(
            'https://api.trafikinfo.trafikverket.se/v2/data.json',
            {
                method: 'POST',
                body: query,
                headers: { 'Content-Type': 'text/xml' },
            },
        );

        return response.json();
    },
};

export default codesService;
