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

  changeStream.on("change", async (change) => {
    await handlePlayerChange(change, io);
    handleStatusChange(change, io);
  });
}

async function handlePlayerChange(change, io) {
  const updatedFields = change.updateDescription.updatedFields;
  const playerUpdates = Object.keys(updatedFields).filter((field) =>
    field.startsWith("players")
  );

  if (playerUpdates.length > 0) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const updatedDocument = await Session.findById(change.documentKey._id);
    console.log(updatedDocument.players);
    console.log(
      "Players array updated. New length: ",
      updatedDocument.players.length
    );

    io.to(String(updatedDocument._id)).emit(
      "playersArrayUpdate",
      updatedDocument
    );
  }
}

function handleStatusChange(change, io) {
  const updatedFields = change.updateDescription.updatedFields;

  if ("status" in updatedFields) {
    switch (change.fullDocument.status) {
      case "ongoing":
        console.log("Session started");
        io.to(String(change.fullDocument._id)).emit(
          "sessionStarted",
          change.fullDocument
        );
        break;
      case "completed":
        console.log("Session completed");
        io.to(String(change.fullDocument._id)).emit(
          "sessionCompleted",
          change.fullDocument
        );
        break;
      case "cancelled":
        io.to(String(change.fullDocument._id)).emit(
          "sessionCancelled",
          change.fullDocument
        );
        break;
    }
  }
}
