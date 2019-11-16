import { createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
      fontFamily: [
        "Lucida Console", 'Monaco', 'monospace'
      ].join(','),
    },
  });

export default theme;