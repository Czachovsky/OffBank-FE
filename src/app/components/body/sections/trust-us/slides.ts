export interface SlideModel {
    header: string;
    content: string;
    image: string;
}

export const slides: SlideModel[] = [
    {
        header: 'Konsorcjum certyfikowanych i sprawdzonych kancelarii – tylko doświadczeni gracze',
        content: 'Współpracujemy wyłącznie z kancelariami, które mają udokumentowane sukcesy w prowadzeniu spraw frankowych. Rynek pełen jest podmiotów, które biorą sprawy bez przygotowania i nie doprowadzają ich do końca. My wiemy, że Twoje zaufanie i wynik sprawy zależy od ludzi, którzy już tę drogę przeszli – skutecznie. Z nami jesteś w dobrych rękach.',
        image: 'assets/img/slide1.webp',
    },
    {
        header: 'Własny model AI wyspecjalizowany w kredytach frankowych',
        content: 'Jako pierwsi w Polsce opracowaliśmy autorski model sztucznej inteligencji, który analizuje dane z tysięcy spraw frankowych, rozpoznaje schematy błędów popełnianych przez banki i prognozuje szanse wygranej. Dzięki temu Twoja sprawa jest oceniana szybko, trafnie i z wykorzystaniem technologii, która zwiększa skuteczność działania.',
        image: 'assets/img/slide2.webp'
    },
    {
        header: 'Jasne i transparentne warunki współpracy',
        content: 'Wielu klientów w Polsce spotkało się z nieczytelnymi umowami, ukrytymi kosztami i brakiem kontaktu ze strony kancelarii. U nas jest inaczej – od pierwszego dnia działamy przejrzyście. Z góry wiesz, na jakich warunkach współpracujemy, jakie są koszty, jakie masz prawa i czego możesz się spodziewać. Uczciwość i komunikacja to nasz fundament.',
        image: 'assets/img/slide3.webp'
    },
    {
        header: 'Innowacyjna, własna aplikacja – pełna kontrola nad Twoją sprawą',
        content: 'Oddajemy w Twoje ręce nowoczesne narzędzie – aplikację, która w czasie rzeczywistym pokazuje, na jakim etapie jest Twoja sprawa. Bezpośredni dostęp do dokumentów, powiadomienia o postępach, status każdego kroku – wszystko w jednym miejscu. Ty masz pełen wgląd, a my gwarantujemy maksymalną przejrzystość działania.',
        image: 'assets/img/slide4.webp'
    }
]
