<template>
  <a-checkbox-group :value="games" @change="changeGame">
    <a-checkbox :value="game" :key="game" v-for="game in gameArray"> {{game | toName("gameType")}} </a-checkbox>
  </a-checkbox-group>
</template>

<script>
import { GAME_ARRAY } from '@/utils/constant'
export default {
  props: {
    value: {
      type: Array,
    },
  },
  data() {
    return {
      gameArray:GAME_ARRAY,
      games: this.value || [],
    }
  },
  methods: {
    changeGame(checkedValue) {
      this.games = checkedValue
      this.$emit('input', checkedValue)
    },
  },
  watch:{
    value(val){
      this.games = val
    }
  }
}
</script>