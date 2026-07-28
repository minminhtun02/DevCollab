import { Link } from '@inertiajs/react';
import { type ComponentProps } from 'react';
import { Button } from '@/components/ui/button';

type ButtonLinkProps = ComponentProps<typeof Link> & {
    variant?: ComponentProps<typeof Button>['variant'];
    size?: ComponentProps<typeof Button>['size'];
};

export function ButtonLink({ variant = 'default', size = 'default', className, children, ...props }: ButtonLinkProps) {
    return (
        <Button variant={variant} size={size} className={className} asChild>
            <Link {...props}>{children}</Link>
        </Button>
    );
}
