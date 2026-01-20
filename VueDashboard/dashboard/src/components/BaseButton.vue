<template>
  <!-- 
    BaseButton Component
    ====================
    A reusable button component with consistent styling
    
    PROPS FLOW:
    - Parent passes configuration DOWN via props
    - textProp: Button label text
    - variantProp: Bootstrap button style (primary, success, danger, etc.)
    - sizeProp: Button size (sm, md, lg)
    - disabledProp: Whether button is disabled
    
    EVENT FLOW:
    - When button is clicked, this component EMITS 'button-clicked' event
    - Parent component LISTENS for this event using v-on:button-clicked
    - Parent can then execute its own logic in response
  -->
  <b-button
    v-bind:variant="variantProp"
    v-bind:size="sizeProp"
    v-bind:disabled="disabledProp"
    v-on:click="handleButtonClick"
    class="base-button"
  >
    <!-- Display button text passed from parent -->
    {{ textProp }}
  </b-button>
</template>

<script>
export default {
  name: 'BaseButton',
  
  // PROPS - Configuration data from parent component
  props: {
    // The text to display on the button
    textProp: {
      type: String,
      required: true
    },
    
    // Bootstrap variant (primary, secondary, success, danger, etc.)
    variantProp: {
      type: String,
      required: false,
      default: 'primary'
    },
    
    // Button size (sm, md, lg)
    sizeProp: {
      type: String,
      required: false,
      default: 'md'
    },
    
    // Whether the button should be disabled
    disabledProp: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  
  methods: {
    // EVENT HANDLER - Executed when button is clicked
    handleButtonClick: function(clickEvent) {
      // Log for debugging
      console.log('BaseButton clicked:', this.textProp);
      
      // EMIT CUSTOM EVENT to parent component
      // Parent can listen with: v-on:button-clicked="someMethod"
      this.$emit('button-clicked', {
        buttonText: this.textProp,
        timestamp: new Date(),
        originalEvent: clickEvent
      });
    }
  }
};
</script>

<style scoped>
/* 
  Scoped styles for BaseButton
  These styles only affect this component
*/

.base-button {
  font-weight: 500;
  transition: all 0.3s ease;
}

.base-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
</style>
