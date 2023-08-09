// https://www.mongodb.com/docs/manual/changeStreams/
import Session from "./models/session.js";

export function setupChangeStreams(io) {
  const changeStream = Session.watch(
    [
      {
        $match: {
          operationType: "update"
        }
      }
    ],
    { fullDocument: "updateLookup" }
  );

  changeStream.on("change", (change) => {
    handlePlayerChange(change, io);
    handleQuadrantsChange(change, io);
    handleStatusChange(change, io);
  });
}

function handlePlayerChange(change, io) {
  const updatedFields = change.updateDescription.updatedFields;
  const playerUpdates = Object.keys(updatedFields).filter((field) =>
    field.startsWith("players")
  );

  if (playerUpdates.length > 0) {
    const previousPlayersLength =
      change.updateDescription.removedFields.players?.length || 0;
    const newPlayersLength = change.fullDocument.players.length;

    if (newPlayersLength !== previousPlayersLength) {
      setTimeout(() => {
        io.to(String(change.fullDocument._id)).emit("numPlayersChanged", {
          sessionId: change.fullDocument._id,
          playersLength: newPlayersLength
        });
      }, 1000);
    }
  }
}

function handleQuadrantsChange(change, io) {
  const updatedFields = change.updateDescription.updatedFields;
  const quadrantUpdates = Object.keys(updatedFields).filter((field) =>
    field.startsWith("quadrants")
  );

  if (quadrantUpdates.length > 0) {
    const previousQuadrantsLength =
      change.updateDescription.removedFields.quadrants?.length || 0;
    const newQuadrantsLength = change.fullDocument.quadrants.length;

    if (newQuadrantsLength !== previousQuadrantsLength) {
      io.to(String(change.fullDocument._id)).emit(
        "quadrantsUpdated",
        change.fullDocument
      );
    }
  }
}

function handleStatusChange(change, io) {
  const updatedFields = change.updateDescription.updatedFields;

  if ("status" in updatedFields) {
    let emitEventName;

    switch (change.fullDocument.status) {
      case "ongoing":
        emitEventName = "sessionStarted";
        break;
      case "completed":
        emitEventName = "sessionCompleted";
        break;
      case "cancelled":
        emitEventName = "sessionCancelled";
        break;
      default:
        return;
    }

    io.to(String(change.fullDocument._id)).emit(
      emitEventName,
      change.fullDocument
    );
  }
}
