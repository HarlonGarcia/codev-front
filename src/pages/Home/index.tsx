import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { AuthContext } from 'contexts/AuthContext';
import { useChallenges } from 'services/challenge';
import { useTechnologies } from 'services/technology';

import { WelcomeSection } from './partials/Welcome';
import * as S from './styles';
import {
    containerVariants,
    itemVariants,
    possibilities,
    sectionAnimationProps,
    technologiesIcons as techIcons,
} from './utils';

export default function Home() {
    const { t } = useTranslation();
    const { isAuthenticated } = useContext(AuthContext);
    
    const { data: technologiesItems = [] } = useTechnologies({
        enabled: isAuthenticated,
    });

    const { data: challenges = [] } = useChallenges({
        page: 0,
        size: 4,
    });

    const technologies = useMemo(() => {
        const items = technologiesItems?.map((technology) => {
            const slug = Object.keys(techIcons)
                .find((key) => technology.slug?.toLowerCase().includes(key));

            return {
                ...technology,
                logo: slug && techIcons[slug],
            };
        });

        return items.slice(0, 12);
    }, [technologiesItems]);

    return (
        <S.Container>
            <WelcomeSection />
            <S.Section {...sectionAnimationProps}>
                <S.Title>{t('pages.home.introduction.title')}</S.Title>
                <S.Paragraph>{t('pages.home.introduction.description')}</S.Paragraph>
                <S.Possibilities
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 2.5 }}
                >
                    {possibilities.map(({ id, label, icon }, index) => (
                        <S.CardItem
                            key={id}
                            animation={index % 2 !== 0 ? 'diff' : undefined}
                            variants={itemVariants}
                        >
                            {label}
                            {icon}
                        </S.CardItem>
                    ))}
                </S.Possibilities>
            </S.Section>

            {technologies.length > 0 && (
                <S.Section {...sectionAnimationProps}>
                    <S.Title>{t('pages.home.technologies.title')}</S.Title>
                    <S.Paragraph>{t('pages.home.technologies.description')}</S.Paragraph>
                    <S.Technologies>
                        {technologies.map(({ id, name, color, logo }) => (
                            <S.Tech key={id}>
                                <span style={{ color }}>
                                    {logo}
                                </span>
                                <small>{name}</small>
                            </S.Tech>
                        ))}
                    </S.Technologies>
                </S.Section>
            )}

            {challenges.length > 0 && (
                <S.Section {...sectionAnimationProps}>
                    <S.Title>{t('pages.home.challenges.title')}</S.Title>
                    <S.Paragraph>{t('pages.home.challenges.description')}</S.Paragraph>

                    <S.LatestChallenges>
                        <S.ChallengeList>
                            {challenges.map(({ id, title }) => (
                                <div key={id}>
                                    <small>{title}</small>
                                    <span>{t('pages.home.challenges.badge')}</span>
                                </div>
                            ))}
                        </S.ChallengeList>
                        <div className='expand_challenges' />
                    </S.LatestChallenges>
                    <Link to='/challenges'>{t('pages.home.challenges.button.text')}</Link>
                </S.Section>
            )}
        </S.Container>
    );
}