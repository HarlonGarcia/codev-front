import { ComponentProps } from 'react';
  
import { getUrlWithoutPrefix } from 'services/utils';

import * as S from './styles';

interface UserLinkProps extends Omit<ComponentProps<'a'>, 'ref'> {
    blank?: boolean;
    prettify?: boolean;
    spacing?: boolean;
};
  
export const UserLink = ({
    href,
    spacing = false,
    prettify = false,
    blank = true,
    ...otherProps
}: UserLinkProps) => {
    const formattedUrl = prettify && href ? getUrlWithoutPrefix(href) : '-';

    return (
        <S.Content
            spacing={spacing}
            href={href}
            target={blank ? '_blank' : undefined}
            rel={blank ? 'noreferrer' : undefined}
            {...otherProps}
        >
            {prettify ? formattedUrl : href}
        </S.Content>
    );
}