import "dotenv/config";
import mongoose from "mongoose";
import User from "../schema/user.js";
import Note from "../schema/note.js";
import CardSlide from "../schema/cardslide.js";

const DEMO_USERNAME = "demo";
const DEMO_PASSWORD = "demo1234";

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION_STRING);

  let user = await User.findOne({ username: DEMO_USERNAME });

  if (!user) {
    user = new User({
      username: DEMO_USERNAME,
      password: DEMO_PASSWORD,
      name: "Usuario Demo",
    });
    await user.save();
    console.log("Cuenta demo creada");
  } else {
    console.log("Cuenta demo ya existe, actualizando datos de ejemplo");
  }

  let cardslide = await CardSlide.findOne({ user: user._id });
  if (!cardslide) {
    cardslide = new CardSlide({
      cardslide: true,
      tictac: true,
      apipelis: true,
      giffy: true,
      messages: true,
      user: user._id,
    });
    await cardslide.save();
    user.cardslide = user.cardslide.concat(cardslide._id);
    await user.save();
  } else {
    cardslide.cardslide = true;
    cardslide.tictac = true;
    cardslide.apipelis = true;
    cardslide.giffy = true;
    cardslide.messages = true;
    await cardslide.save();
  }

  const existingNotes = await Note.find({ user: user._id });
  if (existingNotes.length === 0) {
    const sampleNotes = [
      { title: "Bienvenido", description: "Esta es una cuenta demo pública, puedes crear, editar y borrar notas libremente.", favorite: true },
      { title: "Portafolio", description: "Este proyecto muestra autenticación, notas, chat en tiempo real y más.", favorite: false },
    ];

    for (const noteData of sampleNotes) {
      const note = new Note({ ...noteData, user: user._id });
      await note.save();
      user.notes = user.notes.concat(note._id);
    }
    await user.save();
    console.log("Notas de ejemplo creadas");
  }

  console.log("Listo. Login demo -> usuario: demo / password: demo1234");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
