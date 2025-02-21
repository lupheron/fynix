import React  from 'react';
import Head from '../../Components/Macro/Header/Head';
import css from '../../assets/css/index.module.css'
import landing from '../../assets/media/images/landing.jpg'

function Home() {
    return (
        <div className={css.home}>
            <Head />
            <div className={css.landing_container}>
                <img src={landing} alt="" />
                <div className={css.landing_data}>
                    <h1>O'z biznesingizni qulay va zamonaviy tarizda yuriting.</h1>
                    <p>FYNEX - bu programma orqali siz ishxonangizdagi ishchilarni kelish ketishi va ularning oyliklarining taqsimlanishini amalga oshirishingiz mumkin. Qolaversa kassa, fillial, sklad va mahsulotlaringizni ham boshqara olasiz. Batafsil ma'lumot uchun pastdagi (Batafsil) tugmasini bosing.</p>
                    <button>Batafsil</button>
                </div>
            </div>
        </div>
    );
}

export default Home;