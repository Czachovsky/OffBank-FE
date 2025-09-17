export const OPINIONS: Opinions[] = [
    {
        rate: 5,
        description: 'Cały proces był zaskakująco prosty. Wrzuciłem umowę do analizy, wszystko dostałem w powiadomieniach, a kancelaria zajęła się resztą. Zero stresu, wszystko z telefonu. Polecam każdemu, kto chce się w końcu uwolnić od franków!',
        footer: '– Michał, 39 lat, Poznań',
    },
    {
        rate: 4,
        description: 'Przez lata myślałam, że jestem skazana na te horrendalne raty. Dzięki analizie okazało się, że moja umowa ma poważne nieprawidłowości. W 6 miesięcy odzyskałam ponad 80 tysięcy złotych. To zmieniło moje życie!',
        footer: '– Anna, 44 lata, Warszawa',
    },
    {
        rate: 3,
        description: 'Prawnik przydzielony przez platformę był niesamowicie kompetentny. Wyjaśnił mi każdy krok, zawsze odbierał telefon. Wygraliśmy sprawę w pierwszej instancji. Bankowi się nie opłacało iść dalej. Profesjonalizm na najwyższym poziomie.',
        footer: '– Robert, 52 lata, Kraków',
    },
    {
        rate: 5,
        description: 'Początkowo byłem sceptyczny - za dużo obietnic bez pokrycia w internecie. Ale tutaj wszystko było transparentne, bez ukrytych kosztów. Analiza wykazała abuzywność mojej umowy. Dziś jestem wolny od kredytu, a bank jeszcze mi dopłacił.',
        footer: '– Tomasz, 41 lat, Gdańsk',
    }
]

export interface Opinions {
    rate: number;
    description: string;
    footer: string;
}
