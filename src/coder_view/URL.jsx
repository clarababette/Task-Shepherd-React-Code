import {TextField} from '@mui/material';

function URL({ url, update}) {
  return (
    <TextField
      size='small'
      onChange={(e) => {update(e.target.value, url.description)}}
          required
          label={url.description}
        defaultValue={url.address}
        />
  );
}

export default URL;
