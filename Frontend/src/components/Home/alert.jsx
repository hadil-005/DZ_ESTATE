import React, { useState } from "react";
import "./home.css";
import axios from "axios";

import { useTranslation } from "react-i18next";
import "../../components/Multilingue/i18n";


const Alert = () => {
  const { i18n, t } = useTranslation();
  const [search, setSearch] = useState("");
  const [searchc, setSearchc] = useState("");
  const [showList, setShowList] = useState(false);
  const [showListc, setShowListc] = useState(false);
  const [propertyType, setPropertyType] = useState("house");
  const [roomsNumber, setRoomsNumber] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [maxArea, setMaxArea] = useState("");

  const wilayas = [
    "Adrar","Chlef","Laghouat","Oum El Bouaghi","Batna","Béjaia","Biskra","Béchar","Blida","Bouira","Tamanrasset", "Tébessa","Tlemcen","Tiaret","Tizi Ouzou", "Alger", "Djelfa","Jijel","Sétif","Saïda", "Skikda","Sidi Bel Abbès",
    "Annaba", "Guelma", "Constantine", "Médéa","Mostaganem", "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arreridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt","El Oued", "Khenchela",
    "Souk Ahras","Tipaza", "Mila","Ain Defla", "Naama","Aïn Témouchent","Ghardaïa","Relizane","Timimoun","Bordj Badji Mokhtar","Ouled Djellal","Béni Abbès","In Salah","In Guezzam","Touggourt","Djanet","El Meghaier","El Meniaa",
  ];
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


  const filteredWilayas = wilayas.filter((wilaya) =>
    wilaya.toLowerCase().startsWith(search.toLowerCase())
  );

  const filtercommunes = communes.filter((commune) =>
    commune.toLowerCase().startsWith(searchc.toLowerCase())
  );

  const handleWilayaClick = (wilaya) => {
    setSearch(wilaya);
    setShowList(false);
  };

  const handleCommuneClick = (commune) => {
    setSearchc(commune);
    setShowListc(false);
  };

  const handleSubmit = async () => {
    const alertData = {
      wilaya: search,
      commune: searchc,
      property_type: propertyType,
      max_price: maxPrice,
      area: maxArea,
      rooms_number: roomsNumber,
    };
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://127.0.0.1:3000/api/alerts/alert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(alertData),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();
      console.log("Réponse du backend :", data);
    } catch (error) {
      console.error("Erreur lors de la création de l'alerte :", error);
    }
  };

  return (
    <div>
      <div className="alarm">
        <div className="overlay">
          <p
            className={`custom-text1 ${
              i18n.language === "ar" ? "text-right" : "text-left"
            }`}
          >
            {t("customizeAlerts")}
          </p>
          <p
            className={`custom-text2 ${
              i18n.language === "ar" ? "text-right" : "text-left"
            }`}
          >
            {t("youWillReceiveNotification")}
          </p>
          <div className="labels">
            <div className="label">
              <label htmlFor="propertyType" className="custom-text2">
                {t("whatAreYouLookingFor")}
                <span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="propertyType"
                className="w-[80%] px-2 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="maison">{t("house")}</option>
                <option value="appartement">{t("apartment")}</option>
                <option value="studio">{t("studio")}</option>
                <option value="villa">{t("villa")}</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="custom-text2" htmlFor="wilaya">
                {t("wilaya")}
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                placeholder={t("wilayaPlaceholder")}
                id="wilaya"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowList(e.target.value !== "");
                }}
                className="w-[80%] px-2 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {showList && filteredWilayas.length > 0 && (
                <ul className="list-disc ml-6 border border-gray-300 rounded-md shadow-md bg-white max-h-60 overflow-auto">
                  {filteredWilayas.map((wilaya, index) => (
                    <li
                      key={index}
                      className="cursor-pointer text-gray-700 hover:text-blue-500 px-2 py-1"
                      onClick={() => handleWilayaClick(wilaya)}
                    >
                      {wilaya}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-col">
              <label className="custom-text2" htmlFor="commune">
                {t("commune")}
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                placeholder={t("communePlaceholder")}
                id="commune"
                value={searchc}
                onChange={(e) => {
                  setSearchc(e.target.value);
                  setShowListc(e.target.value !== "");
                }}
                className="w-[80%] px-2 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {showListc && filtercommunes.length > 0 && (
                <ul className="list-disc ml-6 border border-gray-300 rounded-md shadow-md bg-white max-h-60 overflow-auto">
                  {filtercommunes.map((commune, index) => (
                    <li
                      key={index}
                      className="cursor-pointer text-gray-700 hover:text-blue-500 px-2 py-1"
                      onClick={() => handleCommuneClick(commune)}
                    >
                      {commune}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="label">
              <label htmlFor="budget" className="custom-text2">
                {t("budget")} <span style={{ color: "red" }}>*</span>
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder={t("pricePlaceholder")}
                  step="10"
                  className="w-[80%] px-2 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="label">
              <label htmlFor="roomsNumber" className="custom-text2">
                {t("numberOfRooms")} <span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="roomsNumber"
                className="w-[80%] px-2 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={roomsNumber}
                onChange={(e) => setRoomsNumber(e.target.value)}
              >
                <option value="" disabled hidden>
                  {t("numberOfRoomsPlaceholder")}
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            <div className="label">
              <label htmlFor="area" className="custom-text2">
                {t("area")} (m2) <span style={{ color: "red" }}>*</span>
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={maxArea}
                  onChange={(e) => setMaxArea(e.target.value)}
                  placeholder={t("maxAreaPlaceholder")}
                  step="10"
                  className="w-[80%] px-2 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            className="w-full h-[40px] mt-10 bg-blue-600 text-white font-poppins rounded-[5px] hover:bg-blue-700 transition-all duration-200"
            onClick={handleSubmit}
          >
            {t("createAlert")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
