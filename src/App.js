import React, { useState, useEffect } from 'react';
import './App.css';
import NewsCards from './Components/NewsCards/NewsCards';
import alanBtn from '@alan-ai/alan-sdk-web';
import useStyles from './style';
import image from './voice5.png';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
const App = () => {

  const alanKey = '66e33b6f1a0cb23327e77a5c3aa9bcbd2e956eca572e1d8b807a3e2338fdd0dc/stage';
  const [NewsArticles, setArticles] = useState([]);
  const [activeArticle, setAtctiveArticle] = useState(-1);
  const classes = useStyles();
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === 'new articles') {
          setArticles(articles);
          setAtctiveArticle(-1);
        }
        else if (command === 'highlight') {
          setAtctiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        }
        else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            alanBtn().playText('Opening...');
            window.open(article.url, '_blank');

          } else {
            alanBtn().playText('Please try that again...');
          }

        }
      }

    })
  }, [])
  return (
    <div className="App">
      <div className={classes.logoContainer}>
        {NewsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}

        <center>
          <img className={classes.image} src={image} />
        </center>
      </div>
      <NewsCards articles={NewsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
