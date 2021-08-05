<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Chainage Values
          </th>
          <th class="text-left">
            Ground Levels
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="i in index"
          :key="i"
        >
          <td>
            <v-text-field
          v-model="chainage_values[i-1]"
          label="Enter value"
          required></v-text-field>
          </td>
          <td>
              <v-text-field
          v-model="ground_levels[i-1]"
          label="Enter value"
          required></v-text-field>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
name : 'simple-table',
data() {
    return{
    }
},
props : {
    index : {type: Number},
    chainage_values : {type: Array},
    ground_levels : {type: Array}
},
computed: {
    // chainage_values(){
    //     return this.$store.state.chainage_values;
    // },
    // ground_levels(){
    //     return this.$store.state.ground_levels;
    // }
},
methods:{
    setChainageValue(){
        this.$store.commit('set_chainage_values');
    }
}
}
</script>

<style>

</style>