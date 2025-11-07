<script setup>
import { ref, defineProps, watch, computed } from "vue";
import axios from "axios";

const props = defineProps([
    "questionFinished",
    "logician",
    "feeler",
    "creative",
    "username",
    "indonesian",
    "english"
]);

const textsResult = ref();
const imageResult = ref(null);
const isLoading = ref(null);

async function generateArchetype(texts) {
    isLoading.value = true;
    imageResult.value = null;

    try {
        const response = await axios.post("/.netlify/functions/gemini", {
            username: props.username,
            logician: props.logician,
            feeler: props.feeler,
            creative: props.creative,
            texts,
            indonesian: props.indonesian,
            english: props.english
        });

        const raw = response.data.generatedText;
        const clean = raw.replace(/\*/g, ""); // remove markdown bullet artifacts

        textsResult.value = clean;
        console.log("Generated:", clean);
    } catch (error) {
        console.error("Error generating Archetype:", error);
    }
}

/* ✅ FORMATTED PARAGRAPH RESULT */
const formattedTextsResult = computed(() => {
    if (!textsResult.value) return "";

    return textsResult.value
        .trim()
        .split(/\n\s*\n/) // split by blank line
        .map(p => `<p class="mb-4">${p.trim()}</p>`) // ✅ add bottom spacing
        .join("");
});


/* ✅ WATCHER: CHOOSE TEXT BASED ON SCORES */
watch(
    () => props.questionFinished,
    (newValue) => {
        console.log("Generate content is running", newValue);

        if (
            newValue &&
            props.logician > props.feeler &&
            props.logician > props.creative &&
            props.logician !== props.feeler &&
            props.logician !== props.creative
        ) {
            const texts = "Ahli logika adalah individu ...";
            generateArchetype(texts);
        } else if (
            newValue &&
            props.feeler > props.logician &&
            props.feeler > props.creative &&
            props.logician !== props.feeler &&
            props.feeler !== props.creative
        ) {
            const texts = "Sang pemimpi adalah ...";
            generateArchetype(texts);
        } else if (newValue && props.creative > props.logician && props.creative > props.feeler) {
            const texts = "Individu kreatif memancarkan ...";
            generateArchetype(texts);
        } else if (newValue && props.logician === props.feeler && props.logician && props.feeler > props.creative) {
            const texts = "Sang Visioner adalah ...";
            generateArchetype(texts);
        } else if (newValue && props.feeler === props.creative && props.feeler && props.creative > props.logician) {
            const texts = "Pemimpi Visioner adalah ...";
            generateArchetype(texts);
        } else if (newValue && props.logician === props.creative && props.logician && props.creative > props.feeler) {
            const texts = "Pemikir Inovatif adalah ...";
            generateArchetype(texts);
        }
    }
);


/* ✅ RESET */
const retakeTest = () => {
    location.reload();
};
</script>


<template>
    <div class="question-finished" v-if="questionFinished">

        <!-- LOGICIAN -->
        <div class="archetype"
            v-if="logician > feeler && logician > creative && logician !== feeler && logician !== creative">
            <div>
                <img src="../views/img/the-logician.png" alt="">
            </div>

            <div class="archetype-description">
                <h1>{{ username }} is The Logician</h1>
                <div v-html="formattedTextsResult"></div>
            </div>
        </div>

        <!-- DREAMER -->
        <div class="archetype"
            v-if="feeler > logician && feeler > creative && logician !== feeler && feeler !== creative">
            <div>
                <img src="../views/img/the-dreamer.png" alt="">
            </div>

            <div class="archetype-description">
                <h1>{{ username }} is The Dreamer</h1>
                <div v-html="formattedTextsResult"></div>
            </div>
        </div>

        <!-- CREATIVE -->
        <div class="archetype" v-if="creative > logician && creative > feeler">
            <div>
                <img src="../views/img/the-creative.png" alt="">
            </div>

            <div class="archetype-description">
                <h1>{{ username }} is The Creative</h1>
                <div v-html="formattedTextsResult"></div>
            </div>
        </div>

        <!-- VISIONARY -->
        <div class="archetype" v-if="logician === feeler && logician && feeler > creative">
            <div>
                <img src="../views/img/the-visionary.png" alt="">
            </div>

            <div class="archetype-description">
                <h1>{{ username }} is The Visionary</h1>
                <div v-html="formattedTextsResult"></div>
            </div>
        </div>

        <!-- VISIONARY DREAMER -->
        <div class="archetype" v-if="feeler === creative && feeler && creative > logician">
            <div>
                <img src="../views/img/the-visionary-dreamer.png" alt="">
            </div>

            <div class="archetype-description">
                <h1>{{ username }} is The Visionary Dreamer</h1>
                <div v-html="formattedTextsResult"></div>
            </div>
        </div>

        <!-- INNOVATIVE THINKER -->
        <div class="archetype" v-if="logician === creative && logician && creative > feeler">
            <div>
                <img src="../views/img/the-innovative-thinker.png" alt="">
            </div>

            <div class="archetype-description">
                <h1>{{ username }} is The Innovative Thinker</h1>
                <div v-html="formattedTextsResult"></div>
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

/* ✅ Apply spacing to paragraphs inside v-html */
.archetype-description :deep(p) {
    margin-bottom: 1rem;
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
