<template>
  <button
    type="button"
    :disabled="disabled || loading"
    :class="[
      'd-btn',
      `d-btn-${buttonType}`,
      { 'd-btn-disabled': disabled || loading },
      { 'icon-d-btn': icon.length > 0 },
      `d-btn-${size}`,
      { 'icon-s-only': iconOnly },
    ]"
  >
    <d-icon
      v-if="icon"
      :icon-name="icon"
      :width="icon.length > 0 ? 20 : 16"
      :height="icon.length > 0 ? 20 : 16"
    ></d-icon>
    <d-icon
      v-if="loading"
      class="loading"
      width="16"
      height="16"
      icon-name="loading"
    ></d-icon>
    <template v-if="$slots.default">
      <slot></slot>
    </template>
  </button>
</template>

<script>
import DIcon from '../icon'
export default {
  name: 'DButton',
  components: {
    DIcon,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    buttonType: {
      type: String,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'default',
    },
    iconOnly: {
      type: Boolean,
      default: false,
    },
    iconText: {
      type: String,
      default: '',
    },
    placement: {
      type: String,
      default: 'top',
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/style/variables.scss';
@-webkit-keyframes loadingCircle {
  100% {
    transform: rotate(360deg);
  }
}
.d-btn {
  font-weight: 400;
  color: $font-500;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0 16px;
  font-size: 1rem;
  height: 40px;
  // line-height: 40px;
  border-radius: 0.25rem;
  outline: none;
  cursor: pointer;
  min-width: 60px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  &.d-btn-disabled,
  &.d-btn-disabled:hover,
  &.d-btn-disabled:focus,
  &.d-btn-disabled:active {
    opacity: 0.65;
    cursor: not-allowed;
  }
  @each $size, $value in $sizes {
    &.d-btn-#{$size} {
      min-width: inherit;
      height: #{$value}px;
      // line-height: #{$value}px;
      padding: 0 #{$value / 4 + 6}px;
      &.icon-d-btn {
        min-width: inherit;
        width: #{$value}px;
        padding: 0;
        &.icon-s-only {
          min-width: #{$value}px;
          border-color: rgba(255, 255, 255, 0);
          background-color: rgba(255, 255, 255, 0);
          align-items: center !important;
          color: $font-400;
          &:hover {
            background-color: $background-200;
          }
          &.d-btn-disabled {
            border-color: rgba(255, 255, 255, 0);
            background-color: rgba(255, 255, 255, 0);
            color: $font-400;
          }
        }
      }
    }
  }
  & .loading {
    animation: loadingCircle 1s infinite linear;
  }
  & > svg ~ span {
    margin-left: 4px;
  }

  $types: (
    'primary': map-get($theme, 'blue'),
    'secondary': lighten(map-get($theme, 'dark'), 30%),
    'success': map-get($theme, 'green'),
    'danger': map-get($theme, 'red'),
    'warning': map-get($theme, 'yellow'),
    'info': map-get($theme, 'cyan'),
  );

  @each $type, $value in $types {
    &.d-btn-#{$type} {
      &,
      &.d-btn-disabled:hover {
        @if $value == map-get($theme, 'yellow') {
          color: $font;
        } @else {
          color: $white;
        }
        background-color: $value;
        border-color: $value;
      }
      &:hover {
        background-color: darken($value, 10%);
        border-color: darken($value, 10%);
      }
      &:active,
      &:focus {
        background-color: darken($value, 10%);
        border-color: darken($value, 10%);
        box-shadow: 0 0 0 3px lighten($value, 30%);
      }
    }
    &.d-btn-outline-#{$type} {
      & {
        @if $value == map-get($theme, 'yellow') {
          color: darken($value, 40%);
        } @else {
          color: $value;
        }
        border-color: $value;
      }
      &:hover {
        @if $value == map-get($theme, 'yellow') {
          background-color: darken($value, 20%);
        } @else {
          background-color: darken($value, 10%);
        }
        color: $white;
        border-color: darken($value, 10%);
      }
      &.d-btn-disabled:hover {
        color: $value;
        border-color: $value;
        background-color: initial;
      }
      &:active,
      &:focus {
        @if $value == map-get($theme, 'yellow') {
          background-color: darken($value, 20%);
        } @else {
          background-color: darken($value, 10%);
        }
        border-color: darken($value, 10%);
        box-shadow: 0 0 0 3px lighten($value, 30%);
      }
      &:focus {
        color: $white;
      }
    }
  }

  &.d-btn-text {
    color: $theme-blue-500;
    &.d-btn-disabled,
    &.d-btn-disabled:hover {
      text-decoration: none;
    }
    &:hover {
      text-decoration: underline;
    }
    &:active {
      text-decoration: underline;
    }
    &:focus {
      text-decoration: underline;
      color: $theme-blue;
    }
  }
}
</style>
