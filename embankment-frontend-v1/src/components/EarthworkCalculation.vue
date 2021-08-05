<template>
  <v-container>
      <v-row class="mx-4">
          <v-col cols=6>
          <v-text-field
          v-model="gradient_value"
          label="Gradient value"
          hint = "Please enter fixed gradient value for range of chainage values"
          required></v-text-field>
          <v-text-field
          v-model="formation_level"
          label="Formation Level"
          hint = "Please enter Formation level at initial chainage point"
          required></v-text-field>
          <v-text-field
          v-model="top_width"
          label="Top Width"
          hint = "Please enter Top width"
          required></v-text-field>
          </v-col>
          <v-col cols=6>
          <v-text-field
          v-model="initial_chainage_value"
          label="Initial Chainage length"
          hint = "Please enter initial chainage value which have entered fixed gradient"
          required></v-text-field>
          <v-text-field
          v-model="final_chainage_value"
          label="Final Chainage length"
          hint = "Please enter initial chainage value which have entered fixed gradient"
          required></v-text-field>
          </v-col>
          <v-col cols="12" class="mb-2"><v-btn depressed color="primary" class="justify-center"
          @click="showTable = true">
              Confirm
    </v-btn>
          </v-col>
          <v-col cols="8"
          offset="3">
  <div v-if="showTable">
    <simple-table :index="index" :chainage_values="chainage_values"
    :ground_levels="ground_levels" :key="index"></simple-table>
  <v-btn depressed color="primary" class="justify-center" @click="index = index+10">
              Generate more rows
    </v-btn>
    <v-btn depressed color="primary" class="justify-center" @click="onConfirm()">
              Confirm
    </v-btn>
    </div>
  </v-col>
      </v-row>
  </v-container>
</template>

<script>
import SimpleTable from './SimpleTable.vue';
export default {
name: 'earthwork-calculation',
components: {
SimpleTable
},
data() {
    return{
        gradient_value: 0,
        top_width: 0,
        initial_chainage_value: 0,
        final_chainage_value: 0,
        chainage_values: [],
        ground_levels: [],
        formation_levels: [],
        formation_level: 0,
        cutting_values: [],
        filling_values: [],
        area_values: [],
        cutting_filling_list: [],
        distance_values: [],
        cutting_volumes: [],
        filling_volumes: [],
        index: 10,
        showTable: false,
        earthworkCalculation: []
    }
},
methods: {
  onConfirm(){
    this.$store.commit('set_chainage_values', this.chainage_values);
    this.$store.commit('set_ground_levels', this.ground_levels);
    this.calculateCuttingFillingValues();
  },
  calculateCuttingFillingValues(){
    for(let i=0; i < this.chainage_values.length; i++){
      this.formation_levels[i] = Number(this.formation_level) + (this.chainage_values[i] * this.gradient_value);
      let cfValue = this.ground_levels[i] - this.formation_levels[i];
      this.cutting_filling_list[i] = cfValue;
      if (cfValue >= 0){
        this.cutting_values[i] = cfValue;
      } else {
        this.filling_values[i] = cfValue;
    }
    this.area_values[i] = (Number(this.top_width) + (2*Math.abs(cfValue))) * Math.abs(cfValue);
    }
    this.calculateVolume();
  },
  calculateVolume(){
    for(let i=0; i < this.chainage_values.length-1; i++){
      var x, cutting_volume, filling_volume;
      if((this.cutting_filling_list[i] > 0 && this.cutting_filling_list[i+1] < 0) || (this.cutting_filling_list[i] < 0 && this.cutting_filling_list[i+1] > 0)){
        x = ((this.chainage_values[i+1] - this.chainage_values[i]) * Math.abs(this.cutting_filling_list[i])) / (Math.abs(this.cutting_filling_list[i+1]) + Math.abs(this.cutting_filling_list[i]))
      }
      if((this.cutting_filling_list[i] > 0 && this.cutting_filling_list[i+1] > 0) || (this.cutting_filling_list[i] < 0 && this.cutting_filling_list[i+1] < 0)){
        x = this.chainage_values[i+1] - this.chainage_values[i]
      }
      this.distance_values[i] =  x;
      if(this.cutting_filling_list[i] > 0 && this.cutting_filling_list[i+1] < 0){
        cutting_volume = (this.area_values[i] / 2) * this.distance_values[i]
        filling_volume = (this.area_values[i + 1] / 2) * ((this.chainage_values[i+1] - this.chainage_values[i]) - this.distance_values[i])
      }
        
    if(this.cutting_filling_list[i] < 0 && this.cutting_filling_list[i+1] > 0){
        filling_volume = (this.area_values[i] / 2) * this.distance_values[i]
        cutting_volume = (this.area_values[i + 1] / 2) * ((this.chainage_values[i+1] - this.chainage_values[i]) - this.distance_values[i])

        }
    if(this.cutting_filling_list[i] > 0 && this.cutting_filling_list[i+1] > 0){
      cutting_volume = ((this.area_values[i] + this.area_values [i+1])/2) * this.distance_values[i]
        filling_volume = 0
    }
        
    if(this.cutting_filling_list[i] < 0 && this.cutting_filling_list[i+1] < 0){
      filling_volume = ((this.area_values[i] + this.area_values [i+1])/2) * this.distance_values[i]
        cutting_volume = 0
    }
        this.cutting_volumes[i] = cutting_volume;
        this.filling_volumes[i] = filling_volume;
    }
    this.setObjectForDB();
  },
  setObjectForDB(){
    for(let i=0; i<this.chainage_values.length; i++){
      this.earthworkCalculation.push({
        chainage_value: this.chainage_values[i],
        ground_level: this.ground_levels[i],
        formation_level: this.formation_levels[i],
        cutting_filling_value: this.cutting_filling_list[i],
        area_value: this.area_values[i],
        distance_value: this.distance_values[i],
        cutting_volume: this.cutting_volumes[i],
        filling_volume: this.filling_volumes[i]
      });
    }
    this.constantValues  = {
      gradient_value: this.gradient_value,
      initial_chainage_value: this.initial_chainage_value,
      final_chainage_value: this.final_chainage_value,
      top_width: this.top_width
    }
    this.$store.commit('set_final_calculation_values', this.earthworkCalculation);
    this.$store.commit('set_constant_values', this.constantValues);
    this.$router.push({name: "app-dashboard"});
  }
}
}
</script>

<style>

</style>