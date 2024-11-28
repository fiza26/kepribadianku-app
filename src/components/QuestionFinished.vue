<script setup>
import { defineProps, computed, watch } from "vue";

const props = defineProps(['questionFinished', 'logician', 'feeler', 'creative', 'username', 'indonesian', 'english']);


const ifCloseTheVisionary = computed(() => {
    if (props.logician > props.feeler && props.feeler >= 90 || props.feeler > props.logician && props.logician >= 90) {
        return true;
    }
    return false;
});

watch(ifCloseTheVisionary, (newValue) => {
    console.log("if logican and feeler score are almost the same", newValue);
});

const ifCloseTheVisionaryDreamer = computed(() => {
    if (props.feeler > props.creative && props.creative >= 90 || props.creative > props.feeler && props.feeler >= 90) {
        return true;
    }
    return false;
});

watch(ifCloseTheVisionaryDreamer, (newValue) => {
    console.log("If dreamer and creative score are almost the same", newValue);
});

const retakeTest = () => {
    location.reload();
};
</script>

<template>
    <div class="question-finished" v-if="questionFinished">
        <!-- <pre>
        <p>Logician : {{ logician }}</p>
        <p>Feeler : {{ feeler }}</p>
        <p>Creative: {{ creative }}</p>
      </pre> -->
        <div class="archetype" v-if="logician > feeler && logician > creative && logician !== feeler && logician !== creative">
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
        <div class="archetype"
            v-if="feeler > logician && feeler > creative && logician !== feeler && feeler !== creative">
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
        <div class="archetype" v-if="creative > logician && creative > feeler">
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
        <div class="archetype" v-if="logician === feeler && logician && feeler > creative">
            <div>
                <img src="../views/img/the-visionary.png" alt="">
            </div>
            <div class="archetype-description">
                <h1>{{ username }} is The Visionary</h1>
                <p v-if="indonesian">
                    Sang Visioner adalah individu yang memadukan kecermatan berpikir logis dengan imajinasi yang
                    melampaui batas. Mereka memiliki kemampuan untuk menjembatani fakta dengan mimpi, menciptakan
                    ide-ide yang tidak hanya inovatif tetapi juga dapat diwujudkan. Sang Visioner dikenal karena
                    pendekatan mereka yang metodis dalam mengubah gagasan abstrak menjadi solusi konkret. <br><br>

                    Dikendalikan oleh dorongan untuk memahami dunia sekaligus menciptakan sesuatu yang baru, mereka
                    unggul dalam merancang strategi besar yang tidak hanya berdasarkan logika tetapi juga dihiasi oleh
                    nuansa emosional dan estetika. Dengan keseimbangan antara analisis kritis dan intuisi kreatif, Sang
                    Visioner sering kali menjadi inspirasi bagi orang lain, membuktikan bahwa pemikiran rasional dan
                    impian besar dapat berjalan beriringan untuk membentuk masa depan yang lebih baik. <br><br>

                    Sang Visioner akan menjadi arketipe yang memadukan yang terbaik dari dunia fakta dan mimpi,
                    menjadikan mereka seorang pencipta sekaligus seorang pemikir.
                </p>
                <p v-if="english">
                    The Visionary is an individual who combines the precision of logical thinking with boundless
                    imagination. They possess the ability to bridge facts and dreams, creating ideas that are not only
                    innovative but also achievable. The Visionary is known for their methodical approach in transforming
                    abstract concepts into concrete solutions. <br><br>

                    Driven by the desire to understand the world while creating something new, they excel at designing
                    grand strategies that are not only grounded in logic but also infused with emotional and aesthetic
                    nuances. With a balance between critical analysis and creative intuition, The Visionary often
                    inspires others, proving that rational thinking and grand dreams can work hand in hand to shape a
                    better future. <br><br>

                    The Visionary embodies the best of both the worlds of fact and dream, making them both a creator and
                    a thinker.
                </p>
            </div>
        </div>
        <div class="archetype" v-if="feeler === creative && feeler && creative > logician">
            <div>
                <img src="../views/img/the-visionary-dreamer.png" alt="">
            </div>
            <div class="archetype-description">
                <h1>{{ username }} is The Visionary Dreamer</h1>
                <p v-if="indonesian">
                    Pemimpi Visioner adalah arketipe yang memadukan imajinasi tak terbatas dari Sang Pemimpi dengan
                    inovasi berani dari Sang Kreatif. Mereka menjelajahi ranah pemikiran abstrak dan resonansi
                    emosional, sambil dengan penuh keberanian menciptakan ide-ide unik dan revolusioner. Arketipe ini
                    berkembang di persimpangan antara inspirasi dan kecerdikan, mengubah mimpi visioner menjadi realitas
                    yang mengesankan. <br><br>

                    Didorong oleh hasrat bawaan untuk menjelajahi hal-hal yang belum terjamah dan mengekspresikan
                    sesuatu yang luar biasa, Pemimpi Visioner dengan mudah menjalin kreativitas ke dalam mimpi-mimpi
                    mereka, menghidupkan konsep-konsep abstrak melalui ekspresi yang orisinal dan penuh makna. Mereka
                    adalah pelopor kemungkinan, menyeimbangkan intuisi dan inovasi untuk membayangkan dan menciptakan
                    dunia yang menginspirasi kekaguman dan penghormatan. <br><br>

                    Pemimpi Visioner mengingatkan kita bahwa bahkan mimpi yang paling liar sekalipun, jika dipadukan
                    dengan kreativitas tanpa rasa takut, memiliki potensi untuk membentuk realitas baru dan membuka
                    pintu menuju kemungkinan tanpa batas. Mereka adalah pemimpi sekaligus pencipta, selamanya
                    menjembatani kesenjangan antara imajinasi dan inovasi.
                </p>
                <p v-if="english">
                    The Visionary Dreamer is an archetype that blends the boundless imagination of The Dreamer with the
                    bold innovation of The Creative. They navigate the realms of abstract thought and emotional
                    resonance, while fearlessly crafting unique, groundbreaking ideas. This archetype thrives at the
                    intersection of inspiration and ingenuity, transforming visionary dreams into compelling realities.
                    <br><br>

                    Driven by an innate desire to explore the uncharted and express the extraordinary, Visionary
                    Dreamers effortlessly weave creativity into the fabric of their dreams, breathing life into abstract
                    concepts through original and impactful expressions. They are pioneers of possibility, balancing
                    intuition and innovation to envision and create worlds that inspire awe and admiration. <br><br>

                    The Visionary Dreamer reminds us that even the wildest dreams, when paired with fearless creativity,
                    have the potential to shape new realities and open doors to limitless possibilities. They are both
                    dreamers and creators, forever bridging the gap between imagination and innovation.
                </p>
            </div>
        </div>
        <div class="archetype" v-if="logician === creative && logician && creative > feeler">
            <div>
                <img src="../views/img/the-innovative-thinker.png" alt="">
            </div>
            <div class="archetype-description">
                <h1>{{ username }} is The Innovative Thinker</h1>
                <p v-if="indonesian">
                    Pemimpi Visioner adalah arketipe yang memadukan imajinasi tak terbatas dari Sang Pemimpi dengan
                    inovasi berani dari Sang Kreatif. Mereka menjelajahi ranah pemikiran abstrak dan resonansi
                    emosional, sambil dengan penuh keberanian menciptakan ide-ide unik dan revolusioner. Arketipe ini
                    berkembang di persimpangan antara inspirasi dan kecerdikan, mengubah mimpi visioner menjadi realitas
                    yang mengesankan. <br><br>

                    Didorong oleh hasrat bawaan untuk menjelajahi hal-hal yang belum terjamah dan mengekspresikan
                    sesuatu yang luar biasa, Pemimpi Visioner dengan mudah menjalin kreativitas ke dalam mimpi-mimpi
                    mereka, menghidupkan konsep-konsep abstrak melalui ekspresi yang orisinal dan penuh makna. Mereka
                    adalah pelopor kemungkinan, menyeimbangkan intuisi dan inovasi untuk membayangkan dan menciptakan
                    dunia yang menginspirasi kekaguman dan penghormatan. <br><br>

                    Pemimpi Visioner mengingatkan kita bahwa bahkan mimpi yang paling liar sekalipun, jika dipadukan
                    dengan kreativitas tanpa rasa takut, memiliki potensi untuk membentuk realitas baru dan membuka
                    pintu menuju kemungkinan tanpa batas. Mereka adalah pemimpi sekaligus pencipta, selamanya
                    menjembatani kesenjangan antara imajinasi dan inovasi.
                </p>
                <p v-if="english">
                    Pemikir Inovatif adalah arketipe yang mengharmonisasikan ketelitian analitis dari Ahli Logika dengan
                    orisinalitas berani dari Individu Kreatif. Individu ini unggul dalam menganalisis sistem yang
                    kompleks dengan ketelitian logis, sambil secara bersamaan membayangkan solusi revolusioner yang
                    melampaui konvensi. Mereka berkembang di ruang di mana struktur bertemu dengan spontanitas, mengubah
                    wawasan metodis menjadi ide-ide yang inovatif. <br><br>

                    Didorong oleh rasa ingin tahu yang tak henti-hentinya dan semangat penjelajahan yang tanpa rasa
                    takut, Pemikir Inovatif melihat tantangan sebagai peluang untuk menggabungkan logika dengan
                    kreativitas. Mereka mendekati masalah dengan pola pikir sistematis, namun solusi mereka dipenuhi
                    dengan percikan kecerdikan yang membedakan mereka. Dengan menyeimbangkan analisis rasional dengan
                    visi imajinatif, mereka merancang strategi dan inovasi yang tidak hanya praktis tetapi juga sangat
                    orisinal. <br><br>

                    Pemikir Inovatif menginspirasi kita untuk meyakini bahwa ketelitian dan imajinasi bukanlah
                    kebalikan, melainkan sekutu, yang bekerja bersama untuk membentuk masa depan yang logis dan tak
                    terbatas. Mereka adalah pencipta metodis, yang menelusuri jalur baru dengan struktur dan
                    spontanitas.
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