<script setup>
import { ref, defineProps, watch, computed } from "vue";
import axios from "axios";

const props = defineProps([
    'questionFinished',
    'logician',
    'feeler',
    'creative',
    'username',
    'indonesian',
    'english'
]);

const textsResult = ref(null);
const imageResult = ref(null); // State to hold the Base64 image data URI
const isLoading = ref(false); // State for loading indicator

async function generateArchetype(texts) {
    isLoading.value = true; // Start loading
    textsResult.value = null;
    imageResult.value = null;

    try {
        // The endpoint should match your Netlify function path
        const response = await axios.post('/.netlify/functions/gemini', {
            username: props.username,
            logician: props.logician,
            feeler: props.feeler,
            creative: props.creative,
            texts: texts, // Passed to the backend (used primarily for language context)
            indonesian: props.indonesian,
            english: props.english,
        });

        const rawResponseText = response.data.generatedText;
        const cleanedResponseText = rawResponseText ? rawResponseText.replace(/\*/g, '') : '';

        textsResult.value = cleanedResponseText;
        imageResult.value = response.data.generatedImage; // Store the Base64 Data URI

    } catch (error) {
        console.error('Error generating Archetype:', error);
        textsResult.value = "Failed to generate your personality profile and image. Please check your network connection.";
        imageResult.value = null;
    } finally {
        isLoading.value = false; // Stop loading
    }
}

watch(() => props.questionFinished, (newValue) => {
    // Only proceed if quiz is finished and not loading
    if (newValue && !isLoading.value) {
        let texts = "";

        // --- Archetype Text Descriptions ---
        if (props.logician > props.feeler && props.logician > props.creative && props.logician !== props.feeler && props.logician !== props.creative) {
            texts = "Ahli logika adalah individu yang dengan cermat menimbang fakta melawan emosi, selalu memilih pendekatan rasional yang berakar pada logika dan analisis kritis..."
        } else if (props.feeler > props.logician && props.feeler > props.creative && props.logician !== props.feeler && props.feeler !== props.creative) {
            texts = " Sang pemimpi adalah jiwa yang penuh dengan kreativitas tanpa batas dan imajinasi yang tak terkekang..."
        } else if (props.creative > props.logician && props.creative > props.feeler) {
            texts = "Individu kreatif memancarkan aura inovasi dan orisinalitas, menciptakan jalur baru di mana orang lain hanya melihat hal yang biasa..."
        } else if (props.logician === props.feeler && props.logician && props.feeler > props.creative) {
            texts = "Sang Visioner adalah individu yang memadukan kecermatan berpikir logis dengan imajinasi yang melampaui batas..."
        } else if (props.feeler === props.creative && props.feeler && props.creative > props.logician) {
            texts = "Pemimpi Visioner adalah arketipe yang memadukan imajinasi tak terbatas dari Sang Pemimpi dengan inovasi berani dari Sang Kreatif..."
        } else if (props.logician === props.creative && props.logician && props.creative > props.feeler) {
            texts = "Pemikir Inovatif adalah arketipe yang mengharmonisasikan ketelitian analitis dari Ahli Logika dengan orisinalitas berani dari Individu Kreatif..."
        }

        if (texts) {
            generateArchetype(texts);
        }
    }
});


// Computed property for safe HTML rendering and formatting
const formattedTextsResult = computed(() => {
    if (textsResult.value) {
        // Use <br> for simple line breaks and wrap in a paragraph for structure
        return `<p>${textsResult.value.replace(/\n\s*\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`;
    }
    return '';
});

const retakeTest = () => {
    location.reload();
};
</script>

<template>
    <div class="question-finished" v-if="questionFinished">

        <div v-if="isLoading" class="loading-state">
            <div class="spinner"></div>
            <h1>Analyzing Results & Generating Character...</h1>
            <p>Please wait, this can take a moment.</p>
        </div>
        <template v-else-if="textsResult">

            <div class="archetype"
                v-if="props.logician > props.feeler && props.logician > props.creative && props.logician !== props.feeler && props.logician !== props.creative">
                <div>
                    <img :src="imageResult" alt="The Logician Character" v-if="imageResult">
                    <img src="../views/img/the-logician.png" alt="Static Logician Image" v-else>
                </div>
                <div class="archetype-description">
                    <h1>{{ username }} is The Logician</h1>
                    <div v-html="formattedTextsResult"></div>
                </div>
            </div>

            <div class="archetype"
                v-if="props.feeler > props.logician && props.feeler > props.creative && props.logician !== props.feeler && props.feeler !== props.creative">
                <div>
                    <img :src="imageResult" alt="The Dreamer Character" v-if="imageResult">
                    <img src="../views/img/the-dreamer.png" alt="Static Dreamer Image" v-else>
                </div>
                <div class="archetype-description">
                    <h1>{{ username }} is The Dreamer</h1>
                    <div v-html="formattedTextsResult"></div>
                </div>
            </div>

            <div class="archetype" v-if="props.creative > props.logician && props.creative > props.feeler">
                <div>
                    <img :src="imageResult" alt="The Creative Character" v-if="imageResult">
                    <img src="../views/img/the-creative.png" alt="Static Creative Image" v-else>
                </div>
                <div class="archetype-description">
                    <h1>{{ username }} is The Creative</h1>
                    <div v-html="formattedTextsResult"></div>
                </div>
            </div>

            <div class="archetype"
                v-if="props.logician === props.feeler && props.logician && props.feeler > props.creative">
                <div>
                    <img :src="imageResult" alt="The Visionary Character" v-if="imageResult">
                    <img src="../views/img/the-visionary.png" alt="Static Visionary Image" v-else>
                </div>
                <div class="archetype-description">
                    <h1>{{ username }} is The Visionary</h1>
                    <div v-html="formattedTextsResult"></div>
                </div>
            </div>

            <div class="archetype"
                v-if="props.feeler === props.creative && props.feeler && props.creative > props.logician">
                <div>
                    <img :src="imageResult" alt="The Visionary Dreamer Character" v-if="imageResult">
                    <img src="../views/img/the-visionary-dreamer.png" alt="Static Visionary Dreamer Image" v-else>
                </div>
                <div class="archetype-description">
                    <h1>{{ username }} is The Visionary Dreamer</h1>
                    <div v-html="formattedTextsResult"></div>
                </div>
            </div>

            <div class="archetype"
                v-if="props.logician === props.creative && props.logician && props.creative > props.feeler">
                <div>
                    <img :src="imageResult" alt="The Innovative Thinker Character" v-if="imageResult">
                    <img src="../views/img/the-innovative-thinker.png" alt="Static Innovative Thinker Image" v-else>
                </div>
                <div class="archetype-description">
                    <h1>{{ username }} is The Innovative Thinker</h1>
                    <div v-html="formattedTextsResult"></div>
                </div>
            </div>

        </template>

        <div v-else-if="questionFinished && !isLoading && !textsResult" class="error-state">
            <h1>Error: Could Not Generate Archetype</h1>
            <p>The API call failed or returned no data. Please check your network or try again.</p>
        </div>
        <button @click="retakeTest()">Retake Test</button>
    </div>
</template>

<style scoped>
/* All styles from your original component and the new loading/spinner styles */
.question-finished {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    animation-name: pop-animation;
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    min-height: 400px;
}

.question-finished img {
    height: auto;
    width: 400px;
    border-radius: 10px;
    /* Added for generated image style */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    /* Added for generated image style */
}

.archetype {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.archetype-description {
    max-width: 500px;
}

.archetype-description h1 {
    margin-bottom: 10px;
}

/* NEW: Loading and Error Styles */
.loading-state,
.error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px;
    text-align: center;
    min-height: 300px;
}

.spinner {
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-top: 4px solid white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 20px auto;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* End of NEW styles */

button {
    font-family: "Poppins", sans-serif;
    width: 100%;
    max-width: 400px;
    /* Added max-width for better sizing */
    height: 35px;
    border-radius: 15px;
    border: none;
    margin-top: 20px;
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