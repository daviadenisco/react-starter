import palette from './theme.palette';

const { primary, common } = palette;

const styles = {
  containedPrimary: {
    backgroundColor: primary.main,
    color: common.white,
    '&:hover': {
      backgroundColor: primary.main,
    },
  },
};

export default styles;
