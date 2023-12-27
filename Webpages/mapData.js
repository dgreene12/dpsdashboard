var datasets = [
    {
        name: 'All',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/J.D.%20Clement%20Early%20College.geojson'
    }, 
    {
        name: 'Bethesda Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/Bethesda%20Elementary.geojson'
    },
    {
        name: 'Brogden Middle',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2021/map_data/Brogden%20Middle.geojson'
    },
    {
        name: 'Burton Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/Burton%20Elementary.geojson'
    },
    {
        name: 'Carrington Middle',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/Carrington%20Middle.geojson'
    },
    {
        name: 'C.C. Spaulding Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2021/map_data/C.C.%20Spaulding%20Elementary.geojson'
    },
    {
        name: 'City of Medicine Academy [Magnet]',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/City%20of%20Medicine%20Academy.geojson'
    },
    {
        name: 'Club Boulevard Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2021/map_data/Club%20Boulevard%20Elementary.geojson'
    },
    {
        name: 'Creekside Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2021/map_data/Creekside%20Elementary.geojson'
    },
    {
        name: 'Durham Performance Learning Center [Magnet]',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/J.D.%20Clement%20Early%20College.geojson'
    },
    {
        name: 'Durham School of the Arts [Magnet]',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/Durham%20School%20of%20the%20Arts.geojson'
    },
    {
        name: 'Durham School of Technology [Magnet]',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/Durham%20School%20of%20Technology.geojson'
    },
    {
        name: 'Easley Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/Easley%20Elementary.geojson'
    },
    {
        name: 'Eastway Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2021/map_data/Eastway%20Elementary.geojson'
    },
    {
        name: 'E.K. Powe Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2021/map_data/E.K.%20Powe%20Elementary.geojson'
    },
    {
        name: 'Eno Valley Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/Eno%20Valley%20Elementary.geojson'
    },
    {
        name: 'Fayetteville Street Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2021/map_data/Fayetteville%20Street%20Elementary.geojson'
    },
    {
        name: 'Forest View Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2021/map_data/Forest%20View%20Elementary.geojson'
    },
    {
        name: 'George Watts Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/George%20Watts%20Elementary.geojson'
    },
    {
        name: 'Glenn Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/Glenn%20Elementary.geojson'
    },
    {
        name: 'Hillandale Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2021/map_data/Hillandale%20Elementary.geojson'
    },
    {
        name: 'Hillside High',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2021/map_data/Hillside%20High.geojson'
    },
    {
        name: 'Holt Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/Holt%20Elementary.geojson'
    },
    {
        name: 'Holton Career & Resource Center [Magnet]',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/main/data/2023/map_data/Holton%20Career.geojson'
    },
    {
        name: 'Hope Valley Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/Hope%20Valley%20Elementary.geojson'
    },
    {
        name: 'J.D. Clement Early College',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/J.D.%20Clement%20Early%20College.geojson'
    },
    {
        name: 'Jordan High',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2021/map_data/Jordan%20High.geojson'
    },
    {
        name: 'Lakewood Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2021/map_data/Lakewood%20Elementary.geojson'
    },
    {
        name: 'Lakewood Montessori Middle [Magnet]',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2021/map_data/Lakewood%20Middle.geojson'
    },
    {
        name: 'Lakeview High',
        url: 'https://raw.githubcontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/Lakeview%20High.geojson'
    },
    {
        name: 'Lowe\'s Grove Middle',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2021/map_data/Lowes%20Grove%20Middle.geojson'
    },
    //{
        //name: 'Lyons Farm Elementary',
        //url: ''
    //},
    {
        name: 'Lucas Middle',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/Lucas%20Middle.geojson'
    },
    {
        name: 'Mangum Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/Mangum%20Elementary.geojson'
    },
    {
        name: 'Merrick-Moore Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/Merrick-Moore%20Elementary.geojson'
    },
    {
        name: 'Middle College [Magnet]',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/Middle%20College.geojson'
    },
    {
        name: 'Morehead Montessori',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/Morehead%20Montessori%20School.geojson'
    },
    {
        name: 'Neal Middle',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/Neal%20Middle.geojson'
    },
    {
        name: 'Northern High',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/Northern%20High.geojson'
    },
    {
        name: 'Oak Grove Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/0fae2d5fe9688305d03b8609a76c93953e100ee0/data/2023/map_data/Oak%20Grove%20Elementary.geojson'
    },
    {
        name: 'Parkwood Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2021/map_data/Parkwood%20Elementary.geojson'
    },
    {
        name: 'Pearsontown Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/Pearsontown%20Elementary.geojson'
    },
    {
        name: 'R.N. Harris Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/R.N.%20Harris%20Elementary.geojson'
    },
    {
        name: 'Riverside High',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2021/map_data/Riverside%20High.geojson'
    },
    {
        name: 'Rogers Herr Middle',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/Rogers%20Herr%20Middle.geojson'
    },
    {
        name: 'Sandy Ridge Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/Sandy%20Ridge%20Elementary.geojson'
    },
    {
        name: 'School for Creative Studies [Magnet]',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/School%20for%20Creative%20Studies.geojson'
    },
    {
        name: 'Shepard Middle [Magnet]',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/Shepard%20Middle.geojson'
    },
    {
        name: 'Sherwood Githens Middle',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/Sherwood%20Githens%20Middle.geojson'
    },
    {
        name: 'Southern School of Energy and Sustainability',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/Southern%20School%20of%20Energy%20and%20Sustainability.geojson'
    },
    {
        name: 'Southwest Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2021/map_data/Southwest%20Elementary.geojson'
    },
    {
        name: 'Spring Valley Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/Spring%20Valley%20Elementary.geojson'
    },
    {
        name: 'W.G. Pearson Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/W.G.%20Pearson%20Elementary.geojson'
    },
    {
        name: 'Y.E. Smith Elementary',
        url: 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/ad948f53afdecf45c1b604fe33d6c41d343966a4/data/2023/map_data/Y.E.%20Smith%20Elementary.geojson'
    }
];