<script setup>
import { defineProps } from "vue";

const props = defineProps(['questionFinished', 'logician', 'feeler', 'creative', 'username']);
</script>

<template>
    <div class="question-finished" v-if="questionFinished">
        <div class="archetype" v-if="logician >= feeler && logician >= creative">
            <div>
                <img src="../views/img/the-logician.png" alt="">
            </div>
            <div class="archetype-description">
                <h1>{{ username }} is The Logician</h1>
                <p>
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
                <p>
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
                <p>
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
    </div>
</template>

<style scoped>
.question-finished {
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* flex-wrap: wrap; */
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