import delayedService from '../services/delayed.service.mjs';

const delayedController = {
    getDelayedTrains: async (req, res) => {
        const delayedTrainsResult = await delayedService.fetchDelayedTrains();
        const data = delayedTrainsResult.RESPONSE.RESULT[0].TrainAnnouncement;

        return res.json({
            data,
        });
    },
};

export default delayedController;
