import styled from 'styled-components';


const TaggingTabWrapper = styled.div`
  padding: 15px;
  color: #1e262c;
  box-sizing: border-box;
  height: 100%;
  
  * {
    box-sizing: border-box;
  }
`;

const FileWrapper = styled.div``;

const UploadedImageWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 50%;
`;

const UploadedImage = styled.div`
  width: 100%;
  height: 220px;
  background: gainsboro url('${props => props.src}') 50% 50% / contain no-repeat;
`;

const PropName = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 140px;
  font-weight: bold;
`;

const PropValue = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: calc(100% - 140px);
`;

const UploadedImageDesc = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 50%;
  
  ul {
    list-style-type: none;
    padding: 0 0 0 15px;
    margin: 0;
  }
  
  ul li {
    margin-bottom: 20px;
  }
`;

const InputsBlock = styled.div`
  position: relative;
`;

const InputLabel = styled.label`
  display: inline-block;
  padding: ${props => props.p ? props.p : '10px 8px'};
  font-size: ${props => props.fs ? props.fs : 'inherit'};
  color: ${props => props.color === 'black' ? '#1e262c' : ''};
  border-top: ${ props => props.bt ? '1px solid rgb(221, 221, 221)' : 'none'};
  margin-right: ${props => props.mr ? props.mr : 0};
`;

const Textarea = styled.textarea.attrs({
  autoFocus: true
})`
  display: block;
  min-height: 80px;
  width: 100%;
  margin-top: 15px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857;
  color: rgb(85, 85, 85);
  background: rgb(255, 255, 255);
  border-radius: 4px 0 0 4px;
  box-shadow: rgba(0,0,0,0.15) 0px 2px 7px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  border: 1px solid transparent;
  border-right: 0px solid transparent;
  outline: 0;

  :focus {
    border: 1px solid #5D636B;
    border-right: 0px solid transparent;
    outline-color: rgb(77, 144, 254);
    outline-offset: -2px;
    outline-style: auto;
    outline-width: 5px;
  }
`;

const TagsInputWrapper = styled.div`
  margin-top: 15px;

  .react-tagsinput {
    display: block;
    min-height: 80px;
    width: 100%;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857;
    color: rgb(85, 85, 85);
    background: rgb(255, 255, 255);
    border-radius: 4px 0 0 4px;
    box-shadow: rgba(0,0,0,0.15) 0px 2px 7px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    border: 1px solid transparent;
    border-right: 0px solid transparent;
    outline: 0;
  
    :focus {
      border: 1px solid #5D636B;
      border-right: 0px solid transparent;
      outline-color: rgb(77, 144, 254);
      outline-offset: -2px;
      outline-style: auto;
      outline-width: 5px;
    }
  }
  
  .react-tagsinput--focused {
    border: 1px solid #5D636B;
    border-right: 0px solid transparent;
    outline-color: rgb(77, 144, 254);
    outline-offset: -2px;
    outline-style: auto;
    outline-width: 5px;
  }
  
  .react-tagsinput-tag {
    background-color: #cde69c;
    border-radius: 2px;
    border: 1px solid #a5d24a;
    color: #638421;
    display: inline-block;
    font-family: sans-serif;
    font-size: 13px;
    font-weight: 400;
    margin-bottom: 5px;
    margin-right: 5px;
    padding: 5px;
  }
  
  .react-tagsinput-remove {
    cursor: pointer;
    font-weight: bold;
  }
  
  .react-tagsinput-tag a::before {
    content: " ×";
  }
  
  .react-tagsinput-input {
    background: transparent;
    border: 0;
    color: #777;
    font-family: sans-serif;
    font-size: 13px;
    font-weight: 400;
    margin-bottom: 6px;
    margin-top: 1px;
    outline: none;
    padding: 5px;
    min-width: 80px;
    width: 100%;
    max-width: 300px;
  }

`;

const Button = styled.button`
  font-family: Roboto, sans-serif;
  height: 34px;
  padding: 6px 12px;
  line-height: 23px;
  text-transform: uppercase;
  color: #fff;
  background-color: #00707C;
  background-repeat: repeat-x;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 300;
  outline: 0;
  font-size: 12px;
  box-shadow: rgba(0,0,0,0.15) 0px 2px 7px;
  font-weight: 400;
  text-transform: none;
  min-width: 140px;

  :hover {
    background-color: #096868;
  }

  :focus {
    outline-color: rgb(77, 144, 254);
    outline-offset: -2px;
    outline-style: auto;
    outline-width: 5px;
  }
  
  ${props => props.success ? getSuccessStyles() : ''}
`;

function getSuccessStyles() {
  return `
    color: #fff;
    background-color: #28a745;
    border-color: ##28a745;
    
    :hover {
      color: #fff;
      background-color: #218838;
      border-color: #1e7e34;
    }
    
    :focus {
      -webkit-box-shadow: 0 0 0 2px rgba(92, 184, 92, 0.5);
              box-shadow: 0 0 0 2px rgba(92, 184, 92, 0.5);
    }
    
    :active {
      color: #fff;
      background-color: #1e7e34;
      background-image: none;
      border-color: #1c7430;
    }`
}

const TaggingFooter = styled.div`
  margin-bottom: 15px;
  margin-top: 25px;
  text-align: center;
  width: 100%;
  
  button:first-child {
    margin-right: 10px;
  }
`;

const TaggingContent = styled.div`
  min-height: calc(100% - 74px);
`;

const InfoIcon = styled.i`
  background: url('data:image/png;base64,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') 50% 50% / cover no-repeat;
  float: right;
  position: relative;
  top: 3px;
  width: 16px;
  height: 16px;
  vertical-align: middle;
`;

const ErrorWrapper = styled.div`
  padding: 15px;
  font-size: 18px;
  color: orangered;
  text-align: center;
`;

const ErrorParagraph = styled.p``;

const GoBack = styled.a`
  color: #1e262c;
  text-decoration: none;
  font-size: 18px;
  margin-bottom: 15px;
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  
  :hover, :focus, :active {
    text-decoration: none;
    color: #1e262c;
    background: gainsboro;
  }
`;

const BackIcon = styled.i`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  position: relative;
  top: -2px;
  vertical-align: middle;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAIeVJREFUeNrt3XeY3nWZ7/H3TAqENEINJQkldAIEQu9NQIogTReBvVbFLuw5u7JnT2NPcXF1PXLwiCAqRensUTpSBSLNUKVI7yCCoQgkIST7xz1jhpCZPDNPuX/l/bqu35XJZMrnN5nn+d7Pt4IkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZKkIurKDiDpL5YFdgO2BTYAFgCvAo8BN/b8KUmSKmIM8D+AN4GFA1zXA9tnh5UkSc3bHXiGgRv+vtcC4BRgeHZwSZI0eF3APwLzabzx73tdDiyTfROSJKlxKwBXMLSGv+91ZvaNSJKkxswAnqb5xr/32jf7hiRJ0sC+BMyhdY3/QmBW9k1JkqQlGw38nNY2/H2v6dk3KEmSPmxz4HHa1/gvBP5z9k1KkqRFPg28TXsb/4XARdk3KkmSYnne92l/w9973ZR9w5Ik1d1U4F461/gvBH6TfdOSyqc7O4BUIYcD9wBbZAeRJEntN4LYnncBnX3lbw+ApCFzP3GpOasDFwI7ZQeRpMFwCEAauo8B92PjL6mELACkwesGTgKuAlbKDiNJQ+EQgDQ4KwDnAh/PDiJJzbAAkBq3HbHpzqTsIJLULIcApMYcD9yMjb+kirAHQBrYeOCnwCHZQSSplSwApP5NAy4GNsgOIkmt5hCAtGR/A9yJjb8kSbUwCjiHnB393AlQUsc4BCAtsg7R5b9ldhBJajeHAKTwSeIgHxt/SbVgAaC66z3I5xJixr8k1YJDAKqz1YDzgV2zg0hSp9kDoLraE7gPG39JNWUBoLrpPcjnGmCV7DCSlMUhANXJBOBs4MDsIJKUzQJAdbENcZDPlOwgklQEDgGoDo4Hfo2NvyT9hT0AqrLRwGnA0dlBJKloLABUVRsTa/s3yg4iSUXkEICq6AjgDmz8JalfFgCqkpHA6cCFwNjsMJJUZA4BqCrWImb5b50dRJLKwB4AVcE+wN3Y+EtSwywAVGbdwMnA1cBK2WEkqUwcAlBZrUoc5LN7dhBJKiMLAJXRDsREvzWzg0hSWTkEoLI5kdjVz8ZfkppgD4DKYjxwFnBwdhBJqgILAJXBNGJXv/Wzg0hSVTgEoKL7LHAXNv6S1FL2AKioRhG7+nmQjyS1gQWAimhd4GJgenYQSaoqhwBUNIcC92DjL0ltZQGgohgBnEK88h+XHUaSqs4hABXBasAFwC7ZQSSpLuwBULa9gPux8ZekjrIAUJZu4CTgGmDl7DCSVDcOASjDBOAc4IDsIJJUVxYA6rRtgYuAydlBJKnOHAJQJx1PHORj4y9JyewBUCeMBn4IfCY7iCQpWACo3TYhDvLZMDuIJGkRhwDUTkcCt2PjL0mFYwGgdhhJHORzATA2O4wk6aMcAlCrrU3M8p+RHUSS1D97ANRK+wJ3Y+MvSYVnAaBWGAacDFwFrJgdRpK0dA4BqFkTgfOA3bODSJIaZwGgZuwIXAiskR1EkjQ4DgFoKLqAE4GbsfGXpFKyB0CDtTxwFvCJ7CCSpKGzANBgbEbs6rdedhBJUnMcAlCjPgfciY2/JFWCPQBamuWIg3yOzg4iSWodCwANZF2iy3+L7CCSpNZyCED9OQy4Bxt/SaokCwAtbgRwCrGf/7jsMJKk9nAIQH2tTpzgt3N2EElSe9kDoF57A/dh4y9JtWABoG7gJOBqYOXsMJKkznAIoN5WAM4B9s8OIknqLAuA+tqOmOg3KTuIJKnzHAKop+OJg3xs/CWppuwBqJcxxK5+R2UHkSTlsgCoj02JXf02yA4iScrnEEA9fBq4HRt/SVIPC4BqGwmcDpxHdP9LkgQ4BFBlawMXA1tlB5EkFY89ANW0H3A3Nv6SpH5YAFTLMOBk4EpgxewwkqTicgigOiYC5wO7ZQeRJBWfBUA17AhcCKyRHUSSVA4OAZRbF3Aisaufjb8kqWH2AJTX8sDZwEHZQSRJ5WMBUE6bE7v6Tc0OIkkqJ4cAyuc44A5s/CVJTbAHoDyWIw7yOTo7iCSp/CwAymEqsavfFtlBJEnV4BBA8R0O3IONvySphSwAimsEcAqxvn9sdhhJUrU4BFBMqxMN/07ZQSRJ1WQPQPF8DLgfG39JUhtZABRHN3AScBWwUnYYSVK1OQRQDKsA5wF7ZgeRJNWDBUC+7Ynx/knZQSRJ9eEQQK4TgVuw8ZckdZg9ADnGAz8FDskOIkmqJwuAzptG7Oq3QXYQSVJ9WQB01ieBnxA9AFKrrEocEjUGWBYYB4zueXs8cY7EssQR0r1G9Hx8r1E9H9OIOcB7PW+/BXwAzAfe7nnfuz3vf6vnfbP7/L33fX8EXuv5c0H2D1Cqo67sADUxAjgZ+Fv8mUt9LWRRMfAa8Crwh563X+pzvdzzfosFqUVsjNpvDWKW/47ZQaSSm08UAS8Ar/T8+QzwVJ/rreyQUllYALTXnsT6/lWyg0g18RofLgieAp4EHiZ6FyT1sABojxHAd4Cv4c9YKop5wBPAQ0Rh8HDP248C72SHkzrNxqn1VgTOBfbLDiKpIb2Fwf3ArJ7rXuDN7GBSO1kAtJZd/lJ1vMyigmAWcDcx90CqBAuA1vkq8K/AyOwgktpiIdFTcAfwG2AmMYTgygSVkgVA8yYAZwMHZgeR1HHvAw8QxcBtwE3ERESp8CwAmrMJcAmwYXYQSYUwn0UFwa3AjcDr2aGkJbEAGLrjic19Gt09TVI9PQVc3+eanR1IAguAoRgNnAYcnR1EUul8ANzHomLgVmBudijVkwXA4KxFHOQzIzuIpEp4A7gBuBy4AocL1EEWAI07AjgTGJsdRFJlPUy8yLgcuIdYeSC1hQXA0o0ETiVOW5OkTnkG+BXRM3ANseJAahkLgIGtCpwP7J4dRFKtvUz0ClwI3Ix7D6gFLAD6tw/wM2Cl7CCS1MdsYpjgXGK5ocMEGhILgI/qBr4JfAN/PpKK7Tmil/InwGPZYVQuNnAfZpe/pLJ6GDiH2JnUMwu0VBYAi0wnutXWzQ4iSU2YC1wGnE7sROgQgZbIAiCcCPwvYHh2EElqoZeIuQI/IIYLpL+oewEwHjgLODg7iCS10QKiN+AM4N+IHQlVc3UuAKYRB/msnx1EkjroRWKF0/8Dns8Oozx1LQAOA34MjMsOIklJ5hD7CnyXOMFQNVO3AmAUMTHGg3wkaZGZwLeIXQedNFgTdSoA1iVm+U/PDiJJBfUg8B3gPGB+dhi117DsAB1yKHAVcZqfJGnJVgUOAY4legJ+h2cQVFbVewBGENXs12pwr5LUaq8RkwVPxaOKK6fKjeJKxEzXfbKDSFLJvUkUAd8lziJQBVS1ANiLGMNaOTuIJFXIO8QKqm8Cf8gOo+ZUcQ7A14nNfVziJ0mtNRLYFvgsMcR6LzAvO5SGpko9ABOIgzAOyA4iSTUxm1g+eAqxr4BKpCo9ANsCNwBbZweRpBoZRQy5HksMD9yL+wiURhUKgKOJ9f0rZQeRpJoaDxwI7AE8RGw3rIIr8xDAaOCHwGeyg0iSPuQK4ATgyewg6l9ZewA2Aa4nqk1JUrGsD3yJ6Jm9HZibHUgfVcYC4CDgMmBSdhBJUr+GEfOzjiaWDD6YHUgfVqYhgJHERhTHZQeRJA3aTOALxBwBFUBZegDWBq4hJplIkspnMvB5Yv7WbXjYULoy9ADsBpwPTMwOIklqiYeI3tzfZAeps+7sAAMYBpwM3IiNvyRVySZEL8A5wIrZYeqqqD0AE4m9/HfPDiJJaqtXgK8Cl2YHqZsizgHYCrgWmJ4dRJLUdmOAI4B1gFuA97ID1UWRhgC6gBOBO4hJf5Kk+jgGeBQ4ODtIXRRlCGB54gS/T2QHkSSlOxf4CvB2dpAqK0IBsBlwCbBedhBJUmE8QxwydEt2kKrKngNwJPALYLXsH4QkqVCWJ856mYfLBdsiqwdgOeIgn6OzfwCSpMK7GTgKeCk7SJVkFADrEl3+W2TfvCSpNP5ITBS8JjtIVXR6CGBf4CpiuYckSY0aDXyK2EJ4ZnaYKuhUD8AI4DvA1zr4PSVJ1XQzMYfs1ewgZdaJxnh14AJg5+yblSRVxvPAYcBd2UHKqt1DAHsD1wEbZd+oJKlSxhNzAl4B7skOU0btKgC6gBOIzX3GZt+kJKmShgMHAeOAG4CF2YHKpB1DACsQJzztn31zkqTauAE4HJidHaQsWl0AbAdcBEzKvjFJUu08ARxInCmgpWjlYUDHEzMzbfwlSRmmEksEPUq+Aa0oAJYFfgR8D1gm+4YkSbW2ArHfzJHZQYqu2UmAmwI3Ah/LvhFJknoMBw4lhrlvzg5TVM0UAJ8Gfkms85ckqUi6gN2AyUSPwILsQEUzlEmAI4FTgeOyw0uS1IDLiW2E380OUiSDLQDc1U+SVEa3EHsGvJkdpCgGUwDsB5wLrJgdWpKkIXiY2KHWY4VpbBXAMOBk4Eps/CVJ5bUxcBMuVweW3gMwETifmEghSVIVPAfsSWwcVFsDFQAzgIuBtbJDSpLUYs8BewGPZwfJsqQhgC7gROB2bPwlSdU0GbiNGp9Wu3gPwDLAj4GjsoNJktQBzwC7Ej0CtdK3ABgHXIFL/CRJ9fI8sAtRDNRGV58/rwb2yQ4kSVKCR4gJ769mB+mU3jkAR2PjL0mqr42A64AJ2UE6pYsY938OWCU7jCRJyWYSB9xVftvgbuAQbPwlSQLYkTg7oPLH23cDh2WHkCSpQPYAzmBoB+aVRjc1XgMpSVI/jgF+kB2inbqBNbJDSJJUQF8ETsgO0S5dwFvA2OwgkiQV0AfAJ4HLsoO0WjfwbHYISZIKahhwIbB9dpBW6wZ+nx1CkqQCWxa4hIodI9wNXJAdQpKkgludWB5YmSFzNwKSJKlx/x84FFiYHaRZw4gJDi/23JAkSerfRkTbeVN2kGYN6/nzIWA7YGp2IEmSCm4nYBbweHaQZvTd5WgZYj7AwdmhJEkquD8TL5wfyg4yVN193p4LfAr4eXYoSZIKbgxwESWeFNi92N/nAp8htkCs/ElIkiQ1YWPgPEp6ZsCwft7/ADHTcXdg5eyQkiQV1PrA68Bd2UEGa2lVy1jgTOCI7KCSJBXUXOIY4VnZQQaj0W6L44BTgZHZgSVJKqAnga2AN7ODNKq7wY87g1j24LkBkiR91LpEj3lpDBvEx75EzHjcBpiSHVySpILZGHgGuD87SCOGMnOxC/gG8E0a70GQJKkO3gGmU4JNgppZurAHsfxh1eybkCSpQG4Hdia22i+swQwBLO5pYufA7anYEYmSJDVhErEy4NbsIANppgAAeAs4m9hGeKfsm5EkqSB2Ba4h5s8VUit3L/pr4AfAqOybkiSpAB4AtgbmZQdZkmZ7APq6D7gY2A3nBUiStCrxQruQRwe3Y//iUcSmQZ/NvjlJkpLNJ3oB7ssOsrh2HmBwDPBDHBKQJNXbXcAOFGxVQCuHABZ3P3AVsDcwIftGJUlKsgZxYNCd2UH66sQRhuOAnwCHZt+sJElJ3gGmEUvoC6GdPQC95gKX9ry9MyU9N1mSpCaMJPYHuCg7SK9ON8a7EJsHrZZ945IkJTgAuDI7BOS8Gl8F+DmwV/bNS5LUYU8CmwJzsoN0Yghgce8QZwgsJHoEHBKQJNXFCkTjn75NcHbjewBwDq4SkCTVx3vARsCzmSGyj/O9AtiCWCMpSVIdjAL+JTtExhDA4t4EzgcmA5tlh5EkqQM2Bq4Hns8KkD0EsLjPELsHjs4OIklSm90LzAAWZHzz7CGAxf2M+GE8nB1EkqQ2mw4cmfXNi9YD0Gss8CMSfzCSJHXAM8CGxKZ5HVWEOQBLMg+4BHgZ2KfAOSVJasbywGzg9k5/46L2APQ1A7gYWCs7iCRJbTAbWI84MKhjyvDK+iVi7+QZWARIkqpnFHFU8A2d/KZl6AHom/UbwP+mHIWLJEmNmgOsS7zo7YiyNaQzie0T9wXGZIeRJKlFhhMr867t1DcsUw9AX2sCFwI7ZAeRJKlF5gBTgRc78c3K1gPQ6y3iDIFlgB0pbyEjSVKv4cAI4OpOfLMqNJwHAz8lllJIklRmc4legBfa/Y3K2gPQ16PAlcCewErZYSRJasLwnuuadn+jKvQA9FoWOBX4XHYQSZKaMBdYm9gMr22q0APQaz5wOfA0sXvgiOxAkiQNwXCiCLixnd+kSj0AfU0ndg9cNzuIJElDMBuYArzdrm9QpR6Avl4BzgLWJ85cliSpTEYBr9HGMwKq2gPQ9/6+DnwbhwQkSeXyIrAOcUBey1W1B6CvO4FfE/MCxmaHkSSpQeOAJ4H72/HFq94D0NckYvfA7bODSJLUoPuIeW0tV4cegF5vEfMCFgK7UK/iR5JUThOBm4FnW/2F61QAQDT+NwOziAOFRmUHkiRpKUYTK9taqs6vgicDFwHbZgeRJGkA84mNgVq6PXDdegD6ehM4l5hkYREgSSqqbuDPRA92y9S5B6Cvo4DTiW4WSZKK5hViY6CWLQnszr6jgvg5MAN4KDuIJElLMBH4ZCu/oAXAIo8COwG/zA4iSdISfL6VX8whgCU7jjhZcGR2EEmS+tiIeMHaNHsAluwMYAfiZEFJkori6FZ9IXsABrYisVJgv+wgkiQR5wNMAT5o9gvVeRlgI94Dzuv5c3fsMZEk5RpHnHHzeLNfyAKgMTOBW4jdA8dkh5Ek1dqyxEZ2TXEIYHDWIA4U2jE7iCSptuYBawJ/bOaL2AMwOG8TewasROwbIElSpw0jDge6u5kv4pj24M0FvgQcDLyRHUaSVEtNrwZwCKA56wGXAJtlB5Ek1c56wBND/WSHAJrzJ+AsYFVgq+wwkqRa+QNw61A/2R6A1jkGOA1YLjuIJKkWHqSJHmgLgNbaArgYmJodRJJUC9OA3w3lE50E2Fr3EUMBl2QHkSTVwqeG+onOAWi9ucClxDaNu2CRJUlqn4nA94fyiQ4BtNfOwAXA6tlBJEmVtTnwwGA/yVen7XUrMS/guuwgkqTKOngon+QQQPu9SxwotJAYErDXRZLUSuOJY+wHxcaos/YHzgFWyA4iSaqMhcBawHOD+SSHADrrSmJI4I7sIJKkyugCPjHYT3IIoPPeAn5GnOm8bXYYSVIljCR6mBvmEECuvwJOB8ZkB5Ekldr7xLb0sxv9BIcAcp1HLBUc8mEOkiQBI4C9B/MJ9gAUw3jiUKGDs4OolH4LHNnz9vLE43o00SU4sudtgAk9f44hniyWIc6u6CZ+ByGGpha/xvf5upKK68fA5xr9YB/QxdEF/Efgn4Hh2WFUKrcRPUntNpZFBcHixcHiRcPKPddqwCrAqOwfklQDzwOTG/1gC4Di2ZI4S2Dt7CAqjU4VAM2aQOyKOYEoDPp7e02i50LS4G0KPNTIB/pKs3juAbYn5gfskR1GaqHZNDZBaQTRe7AWMIl4RTNpsb+7l4a0ZHvRYAFgD0BxDQP+CfhH/H/SwMrSA9BKo4EpRDHQWyBM6bkmEb0II7JDSgmuIjadWyobluLblThQaGJ2EBVWHQuARkwANgE2BtbpuTYBNsA9UFRd7wEr9vw5IAuAcpgCXAxsnR1EhWQBMDhjgfV7rg16rt6/uyeHqmBP4MalfZBzAMrhWeIJ/rvAl7PDSCX3NjCr51rcGsCGwGY91+ZEr4GTElUme9BAAWAPQPkcROwZMKHJr6PqsAeg/VYHtiKGEzbpeXtD3ExNxTQT2GlpH2QBUE4bE0sFN8oOokKwAMixCtFLsAWLegs2xp5V5ZtL7M8xZ6APsgAor2WBU4DjsoMonQVAcQwn5hRsBexIvAqzp0AZ9gBuGugDLADK7xjgNGJLV9WTBUCxjSV6B3qLgl2IQ1ukdjqJWEreLwuAatiaWCUwJTuIUlgAlEsX0UuwTc+1EzANewnUWtcBHxvoAywAqmMscRDE4dlB1HEWAOU3mtgBdCcW9RK48kDNeJeYLD6vvw+wAKie44BT8cmjTiwAqqe3INiLKAq2wZ0NNXg7ALf394/OVq2eM4AngPOJWcqSyucd4PqeC+KxvCuwG7A7rgBSY7ZlgALAMadqupFYq/yr7CCSWuJVYp7PV4ilhisDRxAF/8vZ4VRY2w70jw4BVFsX8A3gm1jsVZlDAPXWDUwnhgv2InoJ7N0VwJPA1P7+0QKgHvbAIYEqswBQXysSj/m9gAOIXQxVTwuJ3qLXs4Mo11TgXuIXwqta163Zv1wqrOHE3IH/AzxH/u+qV+evfpcC2i1cH08Q+wV8KzuIpI6ZD/wa+FtgMrApsTnMrGa+qEpl2+a/hKrkEOAN8itTL3sAlGcd4HhiCGkB+b/HXu25LuvvF8A5APW1OTGreL3sIGqacwDUrE2Bw4BDe95WdbxEHHMtfcg44FLyK1QvewBUHNOAbwMvkv+77dWaa4kTQZ0DUG9vERX/scB72WEkFcKDwN8TrxpnAP8XZ5GX3eZLeqcFgADOIbYbfSo7iKRCmUXME1gTOIgYNnw/O5QGbbMlvdMCQL3uIfYev77ZLySpcuYAlxO7D64H/FfgsexQapjzOtSQLqLin0f+uJWXcwBUbFsBpxNnF2Q/Drz6vx7I/kVRuexKzB7N/sX1sgBQ8Y0nTiJ9kPzHg9dHr3ks4YRYhwDUn18DWwA3ZAeRVHhvEgcTTSMmDp7LAOfQq+NGABss/k4LAA3kVeDjwPezg0gqjVnAMcT24/8TTyssio/MA7AA0NLMA74GfBr4c3YYSaXxPPDfgLWIpcb3ZQequY+sBLAAUKMuADYB7soOIqlU5hFLjaezaHhgfnaoGtp48XdYAGgwngN2ITYGkaTB6h0emEwcSjQ7O1CNrJ8dQNXxRWJtcPbsVi9XAai8VgD+AXiB/MdR1a+5wLDs/3BVx0bAQ+T/Ytf9sgBQ2XUDhwOPkv94qvL1ocPfHAJQMx4BtgMuzA4iqdQWENsMb0zsNvhIdqCK+tAwgAWAmvU28CngC7juV1JzeguBTYmzB+7JDlQxFgBqizOAHYFnsoNIKr0FxNkDM4hCYFZ2oIpwCEBt81tgB+CW7CCSKmEhUQhsA/w1sRJJQ2cBoLZ6GdgT+Dbx4JWkZi0Azia2s/074E/ZgUrKpYDqmN2BV8if+Vr1y1UAqpvRwInAG+Q//sp0fcASDgWS2mVNYCb5v/hVviwAVFcrAifjniSDudbp/eE5BKB2e4EYEvhRdhBJlfM6sZHQlsC12WFKYnLvGxYA6oQ5xFnhhxDHhkpSKz0M7Eu82Hg4O0zBTel9wwJAnfQLYjbvg9lBJFXSjcAWwAnEHiX6KAsApXmMKAJ+nB1EUiW9D5wCbEicPLgwO1DBOASgVHOAzxFV+vvZYSRV0kvEyYMfB57IDlMgk7IDSL2mEw/O7JmxZb5cBSANbASxbNDVAvD77P8Mqa+VgV+R/8Ao62UBIDVmc+BO8h+zmdc7QFf2f4TUVxdwPHGgUPYDpGyXBYDUuC5iaOB18h+7WdcK2f8J0pLsA/yR/AdImS4LAGnwpgBXkv/4zbg2AicBqniuJc4Evz47iKRKexbYHziC6A2ok4lgAaBi+iOxqcc/EYeASFK7XAxsClyVHaSDVgULABXXB8BJwCeA2dlhJFXaK8ABwBeISXJVZwGgUriC2NnrzuwgkiptIXAGsDUwKztMm1kAqDSeA/YgdvWSpHZ6BNgJOJUoCqrIAkCl8i6xdOdo6tFFJynPHODrwN7E8EDVOAlQpfQzYAbwUHYQSZV3A7F50K+yg7SYPQAqrUeBnYHLsoNIqrxXieWC36I6QwIrZweQmtVF7O/9Pvkba7gRkFR9+1KNHQTfzP5BSq0yA3ia/AeVBYBUfWsCd5H/uG/mWgAMdwhAVfBbogi4JjuIpMp7AdgFOCs7SBO6gOWzQ0it1DskMJ/8CtseAKn6jqO8B5hNzf7hSe1wIPAn8h9gFgBS9R0AvE3+88BgrxkOAaiKLgemATOzg0iqvCuA7YgNy8pkggWAqupFYDeqtXRHUjE9BGwP3JsdZBAsAFRp84F/AA4B3sgOI6nSXiImB5ZlMrIFgGrhl8TGQb/PDiKp0v5MvOC4NDtIA8ZbAKgufkecKnhmdhBJlTYHOBz41+wgSzHWAkB1Mgf4PHAscbiQJLXDQuDviCHIohplAaA6OgfYEXgyO4ikSvsW8GVi572iWc4CQHV1H7F059rsIJIq7TTgCxSvCLAAUK29BuwHnEAcKCRJ7XAm8FfAB9lB+lguO4BUFDsTewdk787lToBSdR1LFAHZzxkLgcvtAZDCrcC2wG+yg0iqrLOBr1CMzcnsAZAWMww4ieJU6fYASNXzZfKfN27P/iFIRbU/8Dr5D1ILAKma/hO5zxv3Zf8ApCJbH7if/AbeAkCqpu+R97zxWPbNS0W3HHAW+Y28BYBUPV3AheQ8bzyTffNSWRxF7POd3dhbAEjVMhK4mc4/bzyffeNSmWwIPEh+g28BIFXLSsATdPZ54yWXAUqNe5Q48/uC7CCSKuU14CDgzQ5+z+HZNy2V1XHAXPJf/dsDIFXHvsB8OvO88Xr2zUplthXwFBYAklrnP9CZ5403sm9UKrtVgRuxAJDUOpfS/ueNt7NvUqqCLuBEOtd1ZwEgVdsY4BHa+7zxXvZNSlWyG/AyFgCSmjcNeJf2PW/My75BqWrWAG7DAkBS875I+543inQ0sVQZywA/oHMFwHXZNyypLbqAX9Ce5413s29OqrJO7R54fvaNSmqb1YA/0frnjaezb0yquvWIU7faWQD8ffZNSmqrY2j988al2Tcl1cEY4lV6uwqAadk3KKmtumj9cuMvZ9+UVCdfpfW7B87MvilJHbEJ8D6ted6YDYzLviGpbrYBnqV1BcBe2TckqWO+i8OGUqmtCFxF8w/iU7JvRFJHjQEeoPlew2HZNyLVWTfwXxj67oH/hqd5SXU0haEfHfw74gWIpALYE3iOxh/AC4DvYeMv1dlqwM0MrvH/BbB8dnBJHzYW+O/AK/T/4P0AuBrYLjuspEIYBvwN8BgDN/y3Awcs6Qt0Zd+BpL8YDuwObAlM7vn7O0S33TXAS9kBJRXSlsRZJBv0/H0eURhcAzyeHU6SJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEnS4Pw7jBXCfzb8CXcAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDEtMjFUMDk6MjQ6MDEtMDU6MDDoRpfJAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTAxLTIxVDA5OjI0OjAxLTA1OjAwmRsvdQAAACh0RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vdG1wL21hZ2ljay1KODhIcDJ5Ypu/934AAAAASUVORK5CYII=') 50% 50% / cover no-repeat;
`;


export {
  TaggingTabWrapper, FileWrapper, UploadedImageWrapper, UploadedImage, UploadedImageDesc, PropName, PropValue,
  InputsBlock, InputLabel, Textarea, TagsInputWrapper, Button, TaggingFooter, TaggingContent, InfoIcon, ErrorWrapper,
  ErrorParagraph, GoBack, BackIcon
};