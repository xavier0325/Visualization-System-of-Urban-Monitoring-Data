<template>
  <div class="energy-energyMain">
    <header>
      <nav>
        <a href="javascript:void(0)">{{ name }}</a>
      </nav>
    </header>
    <section>
      <div id="main-energyMain">
        <transition>
          <div id="powerCollection" v-show="powerCollection">
            <eyPowerCollection :eyCollectionData="eyCollectionData"></eyPowerCollection>
          </div>
        </transition>
      </div>
    </section>
  </div>
</template>

<script>
import eyPowerCollection from "./eyPowerCollection.vue";
export default {
  components: {
    eyPowerCollection,
  },
  data() {
    return {
      powerCollection: true,
    };
  },
  props: ["name","eyCollectionData"],
};
</script>

<style scoped>
.energy-energyMain {
  width: 100%;
  height: 100%;
}
header {
  height: 80px;
  display: flex;
  justify-content: center;
}
header nav a {
  color: #fff;
  font-size: 20px;
  letter-spacing: 2px;
  display: block;
  float: left;
  height: 40px;
  margin-left: 80px;
  position: relative;
}

header nav a:hover {
  color: #f01400;
}
</style>
