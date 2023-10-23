import codesService from '../services/codes.service.mjs';

const codesController = {
    getCodes: async (req, res) => {
        const codesResult = await codesService.fetchCodes();
        const data = codesResult.RESPONSE.RESULT[0].ReasonCode;

        return res.json({
            data,
        });
    },
};

export default codesController;
