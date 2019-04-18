<template>
<div>

<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
  <div class="container">
    <router-link to="/" class="navbar-brand"><b>{{ navTitle }}</b></router-link>
  </div>
</nav>

<div class="container">
  <router-view />
</div>

</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      navTitle: state => state.navTitle
    })
  }
}
</script>

<style lang="scss">
.navbar {
  .container {
    justify-content: center;
  }
}

.navbar-brand {
  font-size: 1.75rem;
}

.bg-blue {
  background: #33A9DA;

  .navbar-brand {
    color: black;

    &:hover {
      color: black;
    }
  }
}

.subtitle {
  background: rgba(128, 128, 128, 0.03);
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;

  padding: 8px 0;

  box-shadow: 2px 2px 10px gray;
  margin-bottom: 1.5vh;
}
</style>
