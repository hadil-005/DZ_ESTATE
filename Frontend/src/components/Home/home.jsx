import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./home.css";
import axios from "axios"; // Import axios
import Cuisine from "../../assets/cuisine.png";
import Homep from "../../assets/Homep.png";
import Building from "../../assets/building.png";
import Box from "../../assets/box.png";
import find from "../../assets/find.png";
import sell from "../../assets/sell.png";
import buy from "../../assets/buy.png";
import sale from "../../assets/sale.png";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { TfiQuoteLeft } from "react-icons/tfi";
import Alert from "../../components/Home/alert.jsx";
import Article from "../Article/Article"; // Import the new Article component
import { useTranslation } from "react-i18next";
import "../../components/Multilingue/i18n";
<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap"
  rel="stylesheet"
></link>;

const Home = () => {
    const { i18n, t } = useTranslation();
    const [testimonials, setTestimonials] = useState([]); // Stocker les commentaires
    const [currentIndex, setCurrentIndex] = useState(0); // Index du commentaire affiché
    const [properties, setProperties] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Appel pour les témoignages
        const commentsResponse = await axios.get(
          "http://localhost:3000/api/comments/home/comment"
        );
        setTestimonials(commentsResponse.data); // Mise à jour des témoignages

        // Appel pour les propriétés
        const propertiesResponse = await fetch(
          "http://localhost:3000/api/property/getThreeRandomProperties"
        );
        const propertiesData = await propertiesResponse.json();

        if (propertiesResponse.ok) {
          setProperties(propertiesData.properties); // Mise à jour des propriétés
        } else {
          console.error(propertiesData.message);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchData();
  }, []);


  const wilayas = [
    "Adrar",
    "Chlef",
    "Laghouat",
    "Oum El Bouaghi",
    "Batna",
    "Béjaia",
    "Biskra",
    "Béchar",
    "Blida",
    "Bouira",
    "Tamanrasset",
    "Tébessa",
    "Tlemcen",
    "Tiaret",
    "Tizi Ouzou",
    "Alger",
    "Djelfa",
    "Jijel",
    "Sétif",
    "Saïda",
    "Skikda",
    "Sidi Bel Abbès",
    "Annaba",
    "Guelma",
    "Constantine",
    "Médéa",
    "Mostaganem",
    "M'Sila",
    "Mascara",
    "Ouargla",
    "Oran",
    "El Bayadh",
    "Illizi",
    "Bordj Bou Arreridj",
    "Boumerdès",
    "El Tarf",
    "Tindouf",
    "Tissemsilt",
    "El Oued",
    "Khenchela",
    "Souk Ahras",
    "Tipaza",
    "Mila",
    "Ain Defla",
    "Naama",
    "Aïn Témouchent",
    "Ghardaïa",
    "Relizane",
    "Timimoun",
    "Bordj Badji Mokhtar",
    "Ouled Djellal",
    "Béni Abbès",
    "In Salah",
    "In Guezzam",
    "Touggourt",
    "Djanet",
    "El Meghaier",
    "El Meniaa",
  ];
  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(false);

  const filteredWilayas = wilayas.filter((wilaya) =>
    wilaya.toLowerCase().startsWith(search.toLowerCase())
  );
  const handleWilayaClick = (wilaya) => {
    setSearch(wilaya);
    setShowList(false);
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setShowList(value !== "");
  };

  const communes = [
    "Tsabit",
    "Ksar Kaddour",
    "Aoulef",
    "Tamentit",
    "Fenoughil",
    "Zaouiet Kounta",
    "Timimoun",
    "Metarfa",
    "Ouled Said",
    "Deldoul",
    "Bouda",
    "Sali",
    "Akabli",
    "Tinerkouk",
    "Talmine",
    "Ouled Ahmed Timmi",
    "Sebaa",
    "In Belbel",
    "Bouda",
    "Chlef",
    "Tenes",
    "Beni Haoua",
    "Sobha",
    "Ouled Farès",
    "El Karimia",
    "Harchoun",
    "Oued Fodda",
    "Boukadir",
    "El Marsa",
    "Abou El Hassan",
    "Oued Goussine",
    "Dahra",
    "Taougrit",
    "Sidi Akkacha",
    "El Hadjadj",
    "Ouled Abbes",
    "Tadjena",
    "Sendjas",
    "Ouled Ben Abdelkader",
    "Breira",
    "Beni Rached",
    "Beni Bouateb",
    "Talassa",
    "Laghouat",
    "Ksar El Hirane",
    "Benacer Benchohra",
    "Sidi Makhlouf",
    "Hassi Delaa",
    "Hassi R'mel",
    "Aflou",
    "Tadjrouna",
    "Sebgag",
    "Brida",
    "Ouled Morah",
    "Gueltat Sidi Saad",
    "El Ghicha",
    "Ain Madhi",
    "Tadjemout",
    "Kheneg",
    "El Assafia",
    "Oued Morra",
    "El Beidha",
    "Sidi Bouzid",
    "Oum El Bouaghi",
    "Aïn Beïda",
    "Aïn M'lila",
    "Sigus",
    "Ouled Hamla",
    "Fkirina",
    "Aïn Babouche",
    "El Amiria",
    "El Belala",
    "Aïn Kercha",
    "Hanchir Toumghani",
    "Berriche",
    "Aïn Diss",
    "Ouled Zouai",
    "Dhalaa",
    "El Harmilia",
    "Aïn Fakroun",
    "Souk Naamane",
    "Zorg",
    "Rahia",
    "Ouled Gacem",
    "Bir Chouhada",
    "Batna",
    "Timgad",
    "Barika",
    "Merouana",
    "N'gaous",
    "Seriana",
    "El Madher",
    "Aïn Touta",
    "Tazoult",
    "Arris",
    "Lambiridi",
    "Bouzina",
    "Chemora",
    "Djerma",
    "Inoughissen",
    "Ichmoul",
    "Aïn Yagout",
    "Fesdis",
    "Gosbat",
    "El Hassi",
    "Tilatou",
    "Talkhamt",
    "Seggana",
    "Guigba",
    "Ouyoun El Assafir",
    "Béjaïa",
    "Akbou",
    "Amizour",
    "Tichy",
    "Souk El Tenine",
    "Tazmalt",
    "Barbacha",
    "Timezrit",
    "Sidi Aïch",
    "El Kseur",
    "Tala Hamza",
    "Kendira",
    "Adekar",
    "Chemini",
    "Aït Smail",
    "Aokas",
    "Bouhamza",
    "Ouzellaguen",
    "Melbou",
    "Feraoun",
    "Tifra",
    "Tamridjet",
    "Taskriout",
    "Semaoune",
    "Biskra",
    "Tolga",
    "El Kantara",
    "Sidi Okba",
    "Ourlal",
    "Djemorah",
    "Lioua",
    "M'chouneche",
    "Aïn Naga",
    "El Ghrous",
    "Zeribet El Oued",
    "Oumache",
    "Chetma",
    "Khenguet Sidi Nadji",
    "El Haouch",
    "Bouchakroun",
    "Bordj Ben Azzouz",
    "Meziraa",
    "Aïn Zaatout",
    "Foughala",
    "El Feidh",
    "Béchar",
    "Kenadsa",
    "Abadla",
    "Erg Ferradj",
    "Taghit",
    "Béni Abbès",
    "Ouled Khoudir",
    "Timoudi",
    "El Ouata",
    "Kerzaz",
    "Igli",
    "Tabelbala",
    "Beni Ikhlef",
    "Tamtert",
    "Boukais",
    "Mechraa Houari Boumediene",
    "Blida",
    "Boufarik",
    "El Affroun",
    "Ouled Yaïch",
    "Mouzaïa",
    "Bouarfa",
    "Chebli",
    "Béni Tamou",
    "Soumaa",
    "Chréa",
    "Chiffa",
    "Hammam Melouane",
    "Ben Khelil",
    "Ouled Slama",
    "Meftah",
    "Larbaa",
    "Bouira",
    "Aïn Bessem",
    "Lakhdaria",
    "El Hachimia",
    "Bordj Okhriss",
    "Haizer",
    "Sour El Ghozlane",
    "M'Chedallah",
    "Bechloul",
    "Bouderbala",
    "Taghzout",
    "Aïn Turk",
    "Aomar",
    "El Adjiba",
    "Ridane",
    "Saharidj",
    "Dechmia",
    "El Hakimia",
    "Taguedit",
    "Ath Mansour",
    "Ath Laâziz",
    "Ath Rached",
    "Tamanrasset",
    "Abalessa",
    "Idles",
    "In Ghar",
    "In Guezzam",
    "In Salah",
    "Foggaret Ezzoua",
    "Tazrouk",
    "Tinzaouatine",
    "Tébessa",
    "Bir El Ater",
    "El Aouinet",
    "Cheria",
    "El Ogla",
    "El Ma Labiodh",
    "Ouenza",
    "Bekkaria",
    "Bir Mokkadem",
    "Hammamet",
    "El Kouif",
    "Negrine",
    "Morsott",
    "Safsaf El Ouesra",
    "Stah Guentis",
    "El Mezeraa",
    "El Ogla El Malha",
    "Guorriguer",
    "Boukhadra",
    "Oum Ali",
    "Aïn Zerga",
    "Aïn El Kebira",
    "Tizi Ouzou",
    "Azazga",
    "Larbaa Nath Irathen",
    "Draa El Mizan",
    "Makouda",
    "Aïn El Hammam",
    "Freha",
    "Boghni",
    "Tigzirt",
    "Beni Douala",
    "Aghribs",
    "Ait Yahia Moussa",
    "Yakouren",
    "Azeffoun",
    "Ouaguenoun",
    "Ifigha",
    "Tizi Gheniff",
    "Aït Aissa Mimoun",
    "Mekla",
    "Aït Bouadou",
    "Iboudraren",
    "Imsouhal",
    "Boudjima",
    "Yatafen",
    "Beni Zmenzer",
    "Iferhounène",
    "Ait Chaffa",
    "Timizart",
    "Illoula Oumalou",
    "Alger-Centre",
    "Sidi M'Hamed",
    "El Madania",
    "Belouizdad",
    "Bab El Oued",
    "Bologhine",
    "Casbah",
    "Oued Koriche",
    "Bir Mourad Raïs",
    "El Biar",
    "Bouzareah",
    "Birkhadem",
    "El Harrach",
    "Baraki",
    "Oued Smar",
    "Bachdjerrah",
    "Hussein Dey",
    "Kouba",
    "Bourouba",
    "Dar El Beïda",
    "Bab Ezzouar",
    "Ben Aknoun",
    "Dely Ibrahim",
    "Hammamet",
    "Raïs Hamidou",
    "Djasr Kasentina",
    "El Mouradia",
    "Hydra",
    "Mohammadia",
    "Boumerdès",
    "Boudouaou",
    "Thenia",
    "Khemis El Khechna",
    "Naciria",
    "Bordj Menaïel",
    "Dellys",
    "Isser",
    "Baghlia",
    "Chabet El Ameur",
    "Zemmouri",
    "Corso",
    "Tidjelabine",
    "Beni Amrane",
    "Larbatache",
    "Ouled Moussa",
    "Afir",
    "Souk El Had",
    "Si Mustapha",
    "El Kharrouba",
    "Timezrit",
    "Ouled Aissa",
    "Taourga",
    "Ben Choud",
    "Legata",
    "Khenchela",
    "Babar",
    "Bouhmama",
    "Chelia",
    "Kaïs",
    "M'Toussa",
    "El Oueldja",
    "Ensigha",
    "Tamza",
    "Khirane",
    "Baghai",
    "Djellal",
    "Aïn Touila",
    "El Hamma",
    "Ouled Rechache",
    "Taouzianat",
    "Yabous",
  ];
  const [searchc, setSearchc] = useState("");
  const [showListc, setShowListc] = useState(false);

  const filtercommunes = communes.filter((commune) =>
    commune.toLowerCase().startsWith(searchc.toLowerCase())
  );
  const handlecommuneClick = (commune) => {
    setSearchc(commune);
    setShowListc(false);
  };
  const handleInputChangec = (e) => {
    const value = e.target.value;
    setSearchc(value);
    setShowListc(value !== "");
  };
  const addTestimonial = (newComment) => {
    setTestimonials((prev) => [...prev, newComment]);
  };

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

   const faqs = [
     {
       question: t("question1"),
       answer: t("answer1"),
     },
     {
       question: t("question2"),
       answer: t("answer2"),
     },
     {
       question: t("question3"),
       answer: t("answer3"),
     },
     {
       question: t("question4"),
       answer: t("answer4"),
     },
     {
       question: t("question5"),
       answer: t("answer5"),
     },
   ];

  return (
    <div className="home">
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${Homep})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="h-20 "></div>
        <Alert />
      </div>
      <div id="apropos" className="flex justify-between mt-4">
        <div className="w-1/2">
          <p className=" text-blue-500 m-20 text-5xl">{t("proposdenous")}</p>
          <p
            className={`m-20 text-xl ${
              i18n.language === "ar" ? "text-right" : "text-left"
            }`}
          >
            {t("dzEstateDescription")}
          </p>
        </div>
        <div className="relative w-1/2 top-10">
          <img src={sale} alt="log" className="absolute top-8 left-1/4 " />
          <img
            src={Building}
            alt="log"
            className="absolute top-1/4 right-10 "
          />
          <img src={Box} alt="log" className="absolute top-1/2 left-1/4 " />
        </div>
      </div>
      <p className=" text-blue-500 mt-20 text-5xl text-center ">
        {t("meilleuresoffres")}
      </p>
      <div className="see-more-btn">
        <Link to="./property">
          <button className="btn-see-more">Voir plus &gt;</button>
        </Link>
      </div>
      <div className="articles">
        {/* Map through the properties and render Article components */}

        {properties.map((property) => (
          <Article
            key={property.id} // Use the property ID as the key
            title={property.title}
            image={property.photo1 || Cuisine} // Use the fetched image or a default
            wilaya={property.wilaya}
            commune={property.commune}
            surface={property.area} // You may need to adjust this based on your data
            price={property.price}
            isNew={true} // Adjust based on your logic
            saleType={property.transaction_status} // Adjust based on your data
          />
        ))}
      </div>

      <div className="bg-black h-80 ">
        <p className="custom-text1 text-white text-center mt-10 pt-10">
          {t("Pourquoinouschoisir")}
        </p>
        <div className="flex ">
          <div className="w-1/3 flex flex-col items-center">
            <img src={find} alt="log" />
            <p className="costum-text2 text-white mt- font-bold mt-4">
              {t("Trouvezvotrefuturemaison")}
            </p>
            <p className="costum-text2 text-white text-center text-xs mt-3">
              {t("N")} <br />
              {t("intelligente")}
            </p>
          </div>
          <div className="w-1/3 flex flex-col items-center">
            <img src={buy} alt="log" />
            <p className="costum-text2 text-white mt-4 font-bold">{t("A")}</p>
            <p className="costum-text2 text-white text-center text-xs mt-3">
              {t("B")} <br />
              {t("C")}
            </p>
          </div>
          <div className="w-1/3 flex flex-col items-center">
            <img src={sell} alt="log" />
            <p className="costum-text2 text-white mt-4 font-bold">{t("D")}</p>
            <p className="costum-text2 text-white text-center text-xs mt-3">
              {t("E")} <br />
              {t("F")}
            </p>
          </div>
        </div>
      </div>
      <div id="comments-section" className="bg-blue-500 text-white py-24">
        <div className="max-w-6xl mx-auto px-6 md:flex justify-between items-center">
          {/* Left Section */}
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("G")}</h2>
            <p className="text-lg mb-6">{t("Q")}</p>
            <div className="flex space-x-8">
              <div>
                <h3 className="text-2xl font-bold">10m+</h3>
                <p> {t("S")} </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold">4.88</h3>
                <p> {t("M")}</p>
                <div className="flex text-yellow-400 mt-1">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="bg-blue-500 p-6  ">
              <div className="flex items-center mb-4">
                <div>
                  <TfiQuoteLeft className="text-gray-300 text-7xl ml-40" />
                </div>
              </div>
              <p className="text-lg mb-6">
                {testimonials.length > 0
                  ? testimonials[currentIndex]?.content
                  : "Aucun témoignage disponible pour le moment."}
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={prevTestimonial}
                  className="w-14 h-8 bg-gray-200 text-gray-800 text-xl rounded-full flex justify-center items-center"
                >
                  &#8249;
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-14 h-8 bg-gray-200 text-gray-800 text-xl rounded-full flex justify-center items-center"
                >
                  &#8250;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="faq" className="max-w-2xl mx-auto py-20">
        <h2 className="text-2xl font-bold text-center mb-4">
          {t("N")}
        </h2>
        <p className="text-center text-gray-600 mb-6">
          {t("V")}{" "}
        </p>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-lg ${
                openIndex === index ? "bg-gray-100" : ""
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 text-left"
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <span className="text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-gray-700">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer addTestimonial={addTestimonial} />
    </div>
  );
};

export default Home;
