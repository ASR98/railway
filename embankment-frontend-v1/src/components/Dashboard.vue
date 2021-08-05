<template>
 <v-container>
      <v-row class="mx-4">
          <v-col cols=6>
              <p>Gradient Value: {{constantValues.gradient_value}}</p>
              <p>Top Width: {{constantValues.top_width}}</p>
              <p></p>
          </v-col>
      </v-row>
      <v-data-table
  :headers="headers"
  :items="earthworkList">
  </v-data-table>
 </v-container>
</template>

<script>
export default {
    name: 'app-dashboard',
data(){
    return{
        headers: [{text:'Chainage Values', value: 'chainage_value'},
        {text:'Ground Levels', value: 'ground_level'},
        {text:'Formation Levels', value: 'formation_level'},
        {text:'Cutting(+)/Filling(-) Value', value: 'cutting_filling_value'},
        {text:'Area', value: 'area_value'},
        {text:'Cutting Volume', value: 'cutting_volume'},
        {text:'Filling Volume', value: 'filling_volume'}]
    }
},
computed:{
    earthworkList() {
        return this.$store.state.final_calculation_values;
    },
    constantValues(){
        return this.$store.state.constant_values;
    }
}
}
</script>

<style>

</style>