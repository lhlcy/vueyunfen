<template>
  	<div class="account_container">
      <transition name="router-fade" mode="out-in">
    		<router-view></router-view>
    	</transition>
    </div>
</template>

<script>

export default {
	name: 'account',
  computed:{

  },
	components: {

	},
  methods: {

  },
  watch:{

  },
	created(){

	},
  mounted(){

  }
}
</script>

<style lang="scss">
  .account_container{
    height: 100%
  }
</style>
