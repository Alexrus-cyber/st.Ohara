import {createSlice} from "@reduxjs/toolkit";
import slider1 from "../../assets/slider1.png";

const initialState = {
    news: [
        {
            id: 1,
            src: slider1,
            title: "Главная новость",
            text: "Genießen Sie unser Ambiente und die exzellente Küche von Peter Hagen-Wiest – ausgezeichnet mit zwei Michelin-Sternen " +
                  "und 18 Gault-Millau Punkte sowie 2020 von der Zeitschrift Feinschmecker“ zum Restaurant des Jahres gewählt.",
            date: "22.22.2022",
            main: true
        },
        {
            id: 2,
            src: slider1,
            title: "Новость",
            text: "Entspannung, Persönlichkeit, Spontaneität – das „Ammolite“ ist frei von elitärer Attitüde, " +
                  "man beherrscht das Handwerk, man pflegt die Konventionen und den Stil – " +
                  "und stellt sich selbst dabei nicht in den Vordergrund.",
            date: "22.22.2022",
            main: false
        },
        {
            id: 3,
            src: slider1,
            title: "Новость",
            text: "Entspannung, Persönlichkeit, Spontaneität – das „Ammolite“ ist frei von elitärer Attitüde, " +
                "man beherrscht das Handwerk, man pflegt die Konventionen und den Stil – " +
                "und stellt sich selbst dabei nicht in den Vordergrund.",
            date: "22.22.2022",
            main: false
        },
        {
            id: 4,
            src: slider1,
            title: "Новость",
            text: "Entspannung, Persönlichkeit, Spontaneität – das „Ammolite“ ist frei von elitärer Attitüde, " +
                "man beherrscht das Handwerk, man pflegt die Konventionen und den Stil – " +
                "und stellt sich selbst dabei nicht in den Vordergrund.",
            date: "22.22.2022",
            main: false
        },
        {
            id: 5,
            src: slider1,
            title: "Новость",
            text: "Entspannung, Persönlichkeit, Spontaneität – das „Ammolite“ ist frei von elitärer Attitüde, " +
                "man beherrscht das Handwerk, man pflegt die Konventionen und den Stil – " +
                "und stellt sich selbst dabei nicht in den Vordergrund.",
            date: "22.22.2022",
            main: false
        },
    ]

}
export const newsSlice = createSlice({
        name: 'newsPage',
        initialState,
        reducers: {}
    }
)

export default newsSlice.reducer;