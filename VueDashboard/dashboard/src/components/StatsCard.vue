<template>
  <!-- 
    StatsCard Component
    ====================
    A reusable card component for displaying statistics/metrics
    
    PROPS FLOW:
    - Parent passes data DOWN to this component via props
    - titleProp: The heading text for the stat card
    - valueProp: The numeric/text value to display
    - iconProp: Optional icon class (e.g., 'fa-users')
    - variantProp: Bootstrap color variant (primary, success, warning, danger, etc.)
  -->
  <b-card 
    v-bind:border-variant="variantProp"
    v-bind:class="cardClasses"
    class="stats-card"
  >
    <!-- Card Header - displays the title -->
    <template v-slot:header>
      <h6 class="mb-0">{{ titleProp }}</h6>
    </template>

    <!-- Card Body - displays the value and optional icon -->
    <b-card-text class="d-flex align-items-center justify-content-between">
      <!-- Display the stat value -->
      <div class="stat-value">
        {{ valueProp }}
      </div>
      
      <!-- Display icon if provided -->
      <div v-if="iconProp" class="stat-icon">
        <i v-bind:class="iconProp"></i>
      </div>
    </b-card-text>

    <!-- Card Footer - optional slot for additional content -->
    <template v-slot:footer>
      <small class="text-muted">Last updated: {{ getCurrentTime() }}</small>
    </template>
  </b-card>
</template>

<script>
export default {
  name: 'StatsCard',
  
  // PROPS - Data received from parent component
  props: {
    // The title/label for this stat card
    titleProp: {
      type: String,
      required: true
    },
    
    // The value to display (can be number or string)
    valueProp: {
      type: [String, Number],
      required: true
    },
    
    // Optional icon class (e.g., Bootstrap icons or Font Awesome)
    iconProp: {
      type: String,
      required: false,
      default: ''
    },
    
    // Bootstrap variant for card border color
    variantProp: {
      type: String,
      required: false,
      default: 'primary'
    }
  },
  
  computed: {
    // Computed property to generate CSS classes based on variant
    cardClasses: function() {
      return 'border-' + this.variantProp;
    }
  },
  
  methods: {
    // Method to get current time for display
    getCurrentTime: function() {
      var now = new Date();
      return now.toLocaleTimeString();
    }
  }
};
</script>

<style scoped>
/* 
  Scoped styles - only apply to this component
  These styles will NOT affect other components
*/

.stats-card {
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

.stat-icon {
  font-size: 2.5rem;
  opacity: 0.3;
}
</style>
