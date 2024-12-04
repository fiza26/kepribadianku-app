<script setup>
import { ref, defineProps, watch } from "vue";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_KEY;
const genAI = new GoogleGenerativeAI(API_KEY)

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const props = defineProps(['questionFinished', 'logician', 'feeler', 'creative', 'username', 'indonesian', 'english']);

// Generate Archetype
const textsResult = ref();

async function result(prompt) {
    const result = await model.generateContent(prompt);

    const rawResponseText = result.response.text();
    const cleanedResponseText = rawResponseText.replace(/\*/g, '');

    textsResult.value = cleanedResponseText;
    console.log(result.response.text());
}

async function generateArchetype(texts) {
    try {
        if (props.indonesian) {
            const prompt = `Describe and deduct ${props.username} personality traits of someone in a full detail based on this following text using bahasa gaul jaksel, harus pakai bahasa gaul jaksel. ${texts} and also consider this score ${props.logician}, ${props.feeler}, ${props.creative}, just consider the score for description or personality trait, don't write the score to the text. Minimum 180 words. Don't use word anjir or buset. Don't assume gender. Don't say based on the text or berdasarkan teks`
            result(prompt)
        } else if (props.english) {
            const prompt = `Describe and deduct ${props.username} personality traits of someone in a full detail based on this following text. ${texts} and also consider this score ${props.logician}, ${props.feeler}, ${props.creative}, just consider the score for description or personality trait, dont write the score to the text, don't say based on the provided text. Minimum 180 words. Don't assume gender`
            result(prompt)
        }
    } catch (error) {
        console.log(error)
    }
}

watch(() => props.questionFinished, (newValue) => {
    console.log("Generate content is running", newValue);
    if (newValue && props.logician > props.feeler && props.logician > props.creative && props.logician !== props.feeler && props.logician !== props.creative) {
        const texts = "Ahli logika adalah individu yang dengan cermat menimbang fakta melawan emosi, selalu memilih pendekatan rasional yang berakar pada logika dan analisis kritis. Proses pengambilan keputusan mereka ditandai oleh pencarian kebenaran yang tak kenal lelah dan komitmen terhadap penalaran berbasis bukti. Mereka berkembang dalam lingkungan yang menuntut presisi dan kejelasan, sering kali menemukan kepuasan dalam memecahkan masalah kompleks melalui deduksi sistematis. Dengan rasa ingin tahu yang tak terpuaskan dan kemampuan untuk menganalisis sistem yang rumit, ahli logika dihargai karena kecakapan analitis mereka, pemikiran metodis, dan komitmen yang teguh terhadap integritas intelektual."
        generateArchetype(texts);
    } else if (newValue && props.feeler > props.logician && props.feeler > props.creative && props.logician !== props.feeler && props.feeler !== props.creative) {
        const texts = " Sang pemimpi adalah jiwa yang penuh dengan kreativitas tanpa batas dan imajinasi yang tak terkekang, menjelajahi alam pikiran yang belum tersentuh oleh batasan realitas. Sifat intuitif mereka dan kecenderungan untuk menggali kedalaman alam bawah sadar sering membuat mereka lebih mengutamakan resonansi emosional dan konsep abstrak daripada fakta yang konkret. Terpikat oleh daya tarik kemungkinan yang tak nyata, para pemimpi menikmati keindahan wilayah yang belum terjamah, menemukan kedamaian dalam dunia seni, sastra, dan upaya visioner. Dengan kemampuan bawaan untuk merangkai cerita ajaib dan membayangkan dunia yang tak terlihat, mereka menginspirasi orang lain untuk merangkul keajaiban dari mimpi-mimpi terliar mereka."
        generateArchetype(texts);
    } else if (newValue && props.creative > props.logician && props.creative > props.feeler) {
        const texts = "Individu kreatif memancarkan aura inovasi dan orisinalitas, menciptakan jalur baru di mana orang lain hanya melihat hal yang biasa. Tanpa terikat oleh konvensi, mereka menghadapi tantangan dengan semangat berani, tak takut melepaskan belenggu tradisi demi mencari solusi yang baru. Kemampuan improvisasi dan kecenderungan mereka untuk berpikir berbeda memberikan mereka adaptabilitas dan kecerdikan, memungkinkan mereka untuk berkembang di tengah ketidakpastian dan perubahan. Dengan memandang kompleksitas sebagai kanvas untuk berekspresi, para kreatif menikmati keragaman kehidupan, menyalurkan energi tanpa batas mereka ke dalam rangkaian ide yang setiap kali semakin cemerlang."
        generateArchetype(texts);
    } else if (newValue && props.logician === props.feeler && props.logician && props.feeler > props.creative) {
        const texts = "Sang Visioner adalah individu yang memadukan kecermatan berpikir logis dengan imajinasi yang melampaui batas. Mereka memiliki kemampuan untuk menjembatani fakta dengan mimpi, menciptakan ide-ide yang tidak hanya inovatif tetapi juga dapat diwujudkan. Sang Visioner dikenal karena pendekatan mereka yang metodis dalam mengubah gagasan abstrak menjadi solusi konkret. Dikendalikan oleh dorongan untuk memahami dunia sekaligus menciptakan sesuatu yang baru, mereka unggul dalam merancang strategi besar yang tidak hanya berdasarkan logika tetapi juga dihiasi oleh nuansa emosional dan estetika. Dengan keseimbangan antara analisis kritis dan intuisi kreatif, Sang Visioner sering kali menjadi inspirasi bagi orang lain, membuktikan bahwa pemikiran rasional dan impian besar dapat berjalan beriringan untuk membentuk masa depan yang lebih baik. Sang Visioner akan menjadi arketipe yang memadukan yang terbaik dari dunia fakta dan mimpi, menjadikan mereka seorang pencipta sekaligus seorang pemikir."
        generateArchetype(texts);
    } else if (newValue && props.feeler === props.creative && props.feeler && props.creative > props.logician) {
        const texts = "Pemimpi Visioner adalah arketipe yang memadukan imajinasi tak terbatas dari Sang Pemimpi dengan inovasi berani dari Sang Kreatif. Mereka menjelajahi ranah pemikiran abstrak dan resonansi emosional, sambil dengan penuh keberanian menciptakan ide-ide unik dan revolusioner. Arketipe ini berkembang di persimpangan antara inspirasi dan kecerdikan, mengubah mimpi visioner menjadi realitas yang mengesankan. Didorong oleh hasrat bawaan untuk menjelajahi hal-hal yang belum terjamah dan mengekspresikan sesuatu yang luar biasa, Pemimpi Visioner dengan mudah menjalin kreativitas ke dalam mimpi-mimpi mereka, menghidupkan konsep-konsep abstrak melalui ekspresi yang orisinal dan penuh makna. Mereka adalah pelopor kemungkinan, menyeimbangkan intuisi dan inovasi untuk membayangkan dan menciptakan dunia yang menginspirasi kekaguman dan penghormatan. Pemimpi Visioner mengingatkan kita bahwa bahkan mimpi yang paling liar sekalipun, jika dipadukan dengan kreativitas tanpa rasa takut, memiliki potensi untuk membentuk realitas baru dan membuka pintu menuju kemungkinan tanpa batas. Mereka adalah pemimpi sekaligus pencipta, selamanya menjembatani kesenjangan antara imajinasi dan inovasi."
        generateArchetype(texts);
    } else if (newValue && props.logician === props.creative && props.logician && props.creative > props.feeler) {
        const texts = "Pemikir Inovatif adalah arketipe yang mengharmonisasikan ketelitian analitis dari Ahli Logika dengan orisinalitas berani dari Individu Kreatif. Individu ini unggul dalam menganalisis sistem yang kompleks dengan ketelitian logis, sambil secara bersamaan membayangkan solusi revolusioner yang melampaui konvensi. Mereka berkembang di ruang di mana struktur bertemu dengan spontanitas, mengubah wawasan metodis menjadi ide-ide yang inovatif. Didorong oleh rasa ingin tahu yang tak henti-hentinya dan semangat penjelajahan yang tanpa rasa takut, Pemikir Inovatif melihat tantangan sebagai peluang untuk menggabungkan logika dengan kreativitas. Mereka mendekati masalah dengan pola pikir sistematis, namun solusi mereka dipenuhi dengan percikan kecerdikan yang membedakan mereka. Dengan menyeimbangkan analisis rasional dengan visi imajinatif, mereka merancang strategi dan inovasi yang tidak hanya praktis tetapi juga sangat orisinal. Pemikir Inovatif menginspirasi kita untuk meyakini bahwa ketelitian dan imajinasi bukanlah kebalikan, melainkan sekutu, yang bekerja bersama untuk membentuk masa depan yang logis dan tak terbatas. Mereka adalah pencipta metodis, yang menelusuri jalur baru dengan struktur dan spontanitas."
        generateArchetype(texts);
    }
});

const retakeTest = () => {
    location.reload();
};
</script>

<template>
    <div class="question-finished" v-if="questionFinished">
        <div class="archetype"
            v-if="logician > feeler && logician > creative && logician !== feeler && logician !== creative">
            <div>
                <img src="../views/img/the-logician.png" alt="">
            </div>
            <div class="archetype-description">
                <h1>{{ username }} is The Logician</h1>
                <p>
                    {{ textsResult }}
                </p>
            </div>
        </div>
        <div class="archetype"
            v-if="feeler > logician && feeler > creative && logician !== feeler && feeler !== creative">
            <div>
                <img src="../views/img/the-dreamer.png" alt="">
            </div>
            <div class="archetype-description">
                <h1>{{ username }} is The Dreamer</h1>
                <p>
                    {{ textsResult }}
                </p>
            </div>
        </div>
        <div class="archetype" v-if="creative > logician && creative > feeler">
            <div>
                <img src="../views/img/the-creative.png" alt="">
            </div>
            <div class="archetype-description">
                <h1>{{ username }} is The Creative</h1>
                <p>
                    {{ textsResult }}
                </p>
            </div>
        </div>
        <div class="archetype" v-if="logician === feeler && logician && feeler > creative">
            <div>
                <img src="../views/img/the-visionary.png" alt="">
            </div>
            <div class="archetype-description">
                <h1>{{ username }} is The Visionary</h1>
                <p>
                    {{ textsResult }}
                </p>
            </div>
        </div>
        <div class="archetype"
            v-if="feeler === creative && feeler && creative > logician">
            <div>
                <img src="../views/img/the-visionary-dreamer.png" alt="">
            </div>
            <div class="archetype-description">
                <h1>{{ username }} is The Visionary Dreamer</h1>
                <p>
                    {{ textsResult }}
                </p>
            </div>
        </div>
        <div class="archetype"
            v-if="logician === creative && logician && creative > feeler">
            <div>
                <img src="../views/img/the-innovative-thinker.png" alt="">
            </div>
            <div class="archetype-description">
                <h1>{{ username }} is The Innovative Thinker</h1>
                <p>
                    {{ textsResult }}
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