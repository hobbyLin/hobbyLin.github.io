<template>
  <!-- <transition name="zntg-toast-pop"> -->
    <div class="zntg-toast" v-show="visible" :class="customClass">
      <span class="zntg-toast-text">{{ message }}</span>
    </div>
  <!-- </transition> -->
</template>

<script>
export default {
    props: {
        message: String,
        position: {
            type: String,
            default: 'middle'
        }
    },

    data() {
        return {
            visible: false
         };
    },

    computed: {
      customClass() {
        var classes = [];
        switch (this.position) {
          case 'top':
            classes.push('is-placetop');
            break;
          case 'bottom':
            classes.push('is-placebottom');
            break;
          default:
            classes.push('is-placemiddle');
        }
        classes.push(this.className);

        return classes.join(' ');
      }
    }
  };
</script>