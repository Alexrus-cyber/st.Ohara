import food1 from "../../../assets/bludo.png";
import food2 from "../../../assets/food2.png";
import food3 from "../../../assets/food3.png";
import photo1 from "../../../assets/slider3.png";
import photo2 from "../../../assets/slider2.png";
import photo3 from "../../../assets/slider1.png";
import barman from "../../../assets/barman.png";
import singer from "../../../assets/singer.png";

export const landingList = {
    hero: {
        title: "Вкусное мясо, отличный виски, хорошее пиво и приятная атмосфера!"
    },
    about: {
        items: [
            {
                id: 1,
                title: "О чем то?",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                img: food1,
                left: 0
            },
            {
                id: 2,
                title: "О чем то?",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                img: food2,
                left: 1
            },
            {
                id: 3,
                title: "О чем то?",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                img: food3,
                left: 0
            }
        ]
    },
    slider: {
        images: [
            {
                url: photo1,
                caption: 'Атмосфера в нашем ресторане'
            },
            {
                url: photo2,
                caption: 'Вкусное мясо, отличный виски!'
            },
            {
                url: photo3,
                caption: 'Мы реально крутые'
            },
        ]
    },
    atmosphere: {
        ContentArr: [
            {
                id: 1,
                img: barman,
                title: "Exklusive Atmosphäre",
                text1: "Genießen Sie unser Ambiente und die exzellente Küche von Peter Hagen-Wiest – ausgezeichnet mit zwei Michelin-Sternen und 18 Gault-Millau Punkte sowie 2020 von der Zeitschrift Feinschmecker“ zum Restaurant des Jahres gewählt.",
                text2: "Entspannung, Persönlichkeit, Spontaneität – das „Ammolite“ ist frei von elitärer Attitüde, man beherrscht das Handwerk, man pflegt die Konventionen und den Stil – und stellt sich selbst dabei nicht in den Vordergrund.",
                left: 0
            },
            {
                id: 2,
                img: singer,
                title: "Exklusive Atmosphäre",
                text1: "Genießen Sie unser Ambiente und die exzellente Küche von Peter Hagen-Wiest – ausgezeichnet mit zwei Michelin-Sternen und 18 Gault-Millau Punkte sowie 2020 von der Zeitschrift Feinschmecker“ zum Restaurant des Jahres gewählt.",
                text2: "Entspannung, Persönlichkeit, Spontaneität – das „Ammolite“ ist frei von elitärer Attitüde, man beherrscht das Handwerk, man pflegt die Konventionen und den Stil – und stellt sich selbst dabei nicht in den Vordergrund.",
                left: 1
            }
        ]
    }

}