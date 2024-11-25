<script setup>
import { defineProps } from "vue";

const props = defineProps(['questionFinished', 'logician', 'feeler', 'creative', 'username', 'indonesian', 'english']);

const retakeTest = () => {
    location.reload();
};
</script>

<template>
    <div class="question-finished" v-if="questionFinished">
        <div class="archetype" v-if="logician >= feeler && logician >= creative">
            <div>
                <img src="../views/img/the-logician.png" alt="">
            </div>
            <div class="archetype-description">
                <h1>{{ username }} is The Logician</h1>
                <p v-if="indonesian">
                    Ahli logika adalah individu yang dengan cermat menimbang fakta melawan emosi, selalu memilih
                    pendekatan rasional yang berakar pada logika dan analisis kritis. Proses pengambilan keputusan
                    mereka ditandai oleh pencarian kebenaran yang tak kenal lelah dan komitmen terhadap penalaran
                    berbasis bukti. Mereka berkembang dalam lingkungan yang menuntut presisi dan kejelasan, sering kali
                    menemukan kepuasan dalam memecahkan masalah kompleks melalui deduksi sistematis. Dengan rasa ingin
                    tahu yang tak terpuaskan dan kemampuan untuk menganalisis sistem yang rumit, ahli logika dihargai
                    karena kecakapan analitis mereka, pemikiran metodis, dan komitmen yang teguh terhadap integritas
                    intelektual.
                </p>
                <p v-if="english">
                    The logician is an individual who meticulously weighs facts against emotions, invariably opting for
                    a
                    rational
                    approach rooted in logic and critical analysis. Their decision-making process is characterized by a
                    relentless
                    pursuit of truth and a commitment to evidence-based reasoning. They thrive in environments that
                    demand
                    precision and clarity, often finding satisfaction in unraveling complex problems through systematic
                    deduction.
                    With an insatiable curiosity and a knack for dissecting intricate systems, logicians are esteemed
                    for
                    their
                    analytical prowess, methodical thinking, and unwavering commitment to intellectual integrity.</p>
            </div>
        </div>
        <div class="archetype" v-if="feeler >= logician && feeler >= creative">
            <div>
                <img src="../views/img/the-dreamer.png" alt="">
            </div>
            <div class="archetype-description">
                <h1>{{ username }} is The Dreamer</h1>
                <p v-if="indonesian">
                    Sang pemimpi adalah jiwa yang penuh dengan kreativitas tanpa batas dan imajinasi yang tak terkekang,
                    menjelajahi alam pikiran yang belum tersentuh oleh batasan realitas. Sifat intuitif mereka dan
                    kecenderungan untuk menggali kedalaman alam bawah sadar sering membuat mereka lebih mengutamakan
                    resonansi emosional dan konsep abstrak daripada fakta yang konkret. Terpikat oleh daya tarik
                    kemungkinan yang tak nyata, para pemimpi menikmati keindahan wilayah yang belum terjamah, menemukan
                    kedamaian dalam dunia seni, sastra, dan upaya visioner. Dengan kemampuan bawaan untuk merangkai
                    cerita ajaib dan membayangkan dunia yang tak terlihat, mereka menginspirasi orang lain untuk
                    merangkul keajaiban dari mimpi-mimpi terliar mereka.
                </p>
                <p v-if="english">
                    The dreamer embodies a soul brimming with boundless creativity and unbridled imagination, traversing
                    realms
                    of thought untouched by the constraints of reality. Their intuitive nature and penchant for
                    exploring the
                    depths of their subconscious often lead them to prioritize emotional resonance and abstract concepts
                    over
                    concrete facts. Enthralled by the ethereal allure of possibility, dreamers revel in the beauty of
                    uncharted
                    territories, finding solace in the realm of art, literature, and visionary pursuits. With an innate
                    ability
                    to weave tales of wonder and envision worlds unseen, they inspire others to embrace the magic of
                    their
                    wildest dreams.
                </p>
            </div>
        </div>
        <div class="archetype" v-if="creative > logician && feeler">
            <div>
                <img src="../views/img/the-creative.png" alt="">
            </div>
            <div class="archetype-description">
                <h1>{{ username }} is The Creative</h1>
                <p v-if="indonesian">
                    Individu kreatif memancarkan aura inovasi dan orisinalitas, menciptakan jalur baru di mana orang
                    lain hanya melihat hal yang biasa. Tanpa terikat oleh konvensi, mereka menghadapi tantangan dengan
                    semangat berani, tak takut melepaskan belenggu tradisi demi mencari solusi yang baru. Kemampuan
                    improvisasi dan kecenderungan mereka untuk berpikir berbeda memberikan mereka adaptabilitas dan
                    kecerdikan, memungkinkan mereka untuk berkembang di tengah ketidakpastian dan perubahan. Dengan
                    memandang kompleksitas sebagai kanvas untuk berekspresi, para kreatif menikmati keragaman kehidupan,
                    menyalurkan energi tanpa batas mereka ke dalam rangkaian ide yang setiap kali semakin cemerlang.
                </p>
                <p v-if="english">
                    The creative individual radiates an aura of innovation and originality, forging new pathways where
                    others
                    see only the familiar. Unfettered by convention, they approach challenges with an audacious spirit,
                    unafraid
                    to discard the shackles of tradition in pursuit of novel solutions. Their improvisational flair and
                    propensity for divergent thinking imbue them with a sense of adaptability and resourcefulness,
                    enabling
                    them
                    to thrive in environments of uncertainty and change. Embracing complexity as a canvas for
                    expression,
                    creatives revel in the multifaceted nature of life, channeling their boundless energy into a
                    tapestry of
                    ideas, each more ingenious than the last.
                </p>
            </div>
        </div>
        <button @click="retakeTest()">Retake Test</button>
    </div>
</template>

<style scoped>
.question-finished {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    animation-name: pop-animation;
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
}

.question-finished img {
    height: auto;
    width: 400px;
}

.archetype {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

button {
    font-family: "Poppins", sans-serif;
    width: 100%;
    height: 35px;
    border-radius: 15px;
    border: none;
    margin-top: 10px;
    cursor: pointer;
    background-color: #101825;
    color: white;
    transition: ease-in-out 0.3s;
}

button:hover {
    background-color: white;
    color: black;
}

@keyframes pop-animation {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@media screen and (max-width: 768px) {
    .question-finished {
        flex-wrap: wrap;
    }

    .question-finished img {
        width: 70vw;
    }

    .archetype {
        flex-wrap: wrap;
    }
}
</style>