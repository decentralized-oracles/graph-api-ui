import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#202020' : '#fff',
    ...theme.typography.body2,
    textAlign: 'left',
    padding: 20,    
    color: theme.palette.text.secondary,
    fontSize: '1.1em',
    height: '100%',
    borderRadius: '8px'
  }));