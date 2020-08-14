import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import { Grid, Grow, Typography } from '@material-ui/core';
import useStyles from './Style';

const NewsCards = ({ articles, activeArticle }) => {
    const classes = useStyles();

    const infoCards = [
        { color: '#283593', title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', text: 'Give me the news from CNN' },
        { color: '#4527a0', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...', text: 'What\'s up with PlayStation 5' },
        { color: '#00838f', title: 'Latest News', text: 'Give me the latest news' },
        { color: '#1565c0', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
    ];


    if (!articles.length) {
        return (
            <div>
                <Grow in>

                    <Grid className={classes.container} container alignItems="stretch" spacing={3}>


                        {infoCards.map((infoCard) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoCard}>
                                <div className={classes.card} style={{ backgroundColor: infoCard.color }}>
                                    <Typography variant="h5" component="h5">{infoCard.title}</Typography>
                                    <Typography variant="h6" color="inherit" component="h6">Try saying: <br /> <i>{infoCard.text}</i></Typography>
                                    {infoCard.info ? <Typography variant="h6" component="h6"><strong>{infoCard.title.split(' ')[2]}</strong>: <br />{infoCard.info}</Typography> : null}

                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </Grow>
            </div>
        );
    }
    return (

        <Grow in>
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>

                {articles.map((article, i) => {
                    return (
                        <Grid item xs={12} small={6} md={4} lg={3} style={{ display: 'flex' }}>
                            <NewsCard key={i} i={i} article={article} activeArticle={activeArticle} />
                        </Grid>
                    );
                })}

            </Grid>

        </Grow>
    )
}

export default NewsCards;
