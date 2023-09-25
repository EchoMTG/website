<template>
    <span :class="`featureGate ${classes}`">
        <b-button
            v-if="showAd && !gateLevelCheck"
            icon-left="arrow-up-bold-hexagon-outline"
            :size="size"
            type="is-danger"
            @click="gotoplans"
            class="">{{adText}}</b-button>
        <slot v-if="gateLevelCheck"></slot>
    </span>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'FeatureGate',
    props: {
        classes: {
            type: String,
            default: ''
        },
        gateLevel: {
            type: Number,
            required: true
        },
        showAd: {
            type: Boolean,
            default: true
        },
        adText: {
            type: String,
            default: 'Upgrade Plan'
        },
        size: {
            type: String,
            default: 'is-small'
        }
    },
    methods: {
      gotoplans() {
        this.$router.push('/plans/')
      }
    },
    computed: {
        gateLevelCheck(){
            let userLevel = 0;

            switch(this.user.plan.toLowerCase()){
                case 'pro':
                case 'proy':
                    userLevel = 4;
                    break;
                case 'mythic':
                case 'mythicy':
                    userLevel = 3;
                    break;
                case 'rare':
                case 'rarey':
                    userLevel = 2;
                    break;
                case 'uncommon':
                case 'uncommony':
                    userLevel = 1;
                    break;
                default:
                    userLevel = 0;
            }

            return this.gateLevel <= userLevel
        },
        ...mapState([
            'user',
            'authenticated'
        ])
    }
}
</script>
