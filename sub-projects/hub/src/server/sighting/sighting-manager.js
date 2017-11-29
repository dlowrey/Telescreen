const sightingModels = require('sighting/sighting-models');

const errors = require('resources/errors.js');

const Sighting = sightingModels.Sighting;
const LatestSighting = sightingModels.LatestSighting;

async function createSighting(data) {
  try {
    // Ensure the required data is available.
    if (!data) {
      throw new errors.MissingParametersError();
    }   
    const info = {
      cameraId: data.cameraId,
      POIId: data.POIId,
      time: data.time,
    };
    
    const sighting = new Sighting(info);
    const created = await sighting.save();
    const existing = await LatestSighting
    .findOneAndUpdate({
        POIId: data.POIId,
      },
      {
        $set: info,
      },
      {
        new: true,
    });

    if (!existing) {
      const latestSighting = new LatestSighting(info);

      await latestSighting.save();
    }
    return created.id;
  } catch (err) {
    throw err;
  }
}

module.exports = { createSighting };
