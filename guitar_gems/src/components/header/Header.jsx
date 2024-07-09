import { useState } from 'react';
import { Button, Dialog, DialogTrigger, OverlayArrow, Popover, Switch } from 'react-aria-components';
import { useSession } from '../../contexts/SessionContext';
import { supabase } from '../../supabaseClient';
import './styles/header.css';
import './styles/popover.css';
import { useHistory, useLocation } from 'react-router-dom';

export default function Header() {
    const { session } = useSession();
    const [loading, setLoading] = useState();
    const history = useHistory();
    const location = useLocation();

    const handleSignOut = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        console.log(error);
        setLoading(false);
    };

    const handleSignInClick = () => {
        history.push('/guitar_gems/sign-in', { from: location.pathname });
    };

    return (
        <header>
            {session?.user.app_metadata.role === 'editor' &&
                <Button>
                    <span className="material-symbols-outlined">add_circle</span>
                    <p>Add guitar</p>
                </Button>
            }

            {session ?
                <DialogTrigger>
                    <Button>
                        <span className="material-symbols-outlined">account_circle</span>
                        <p>{session.user.user_metadata.name}</p>
                    </Button>

                    <Popover>
                        <OverlayArrow>
                            <svg width={12} height={12} viewBox="0 0 12 12">
                                <path d="M0 0 L6 6 L12 0" />
                            </svg>
                        </OverlayArrow>
                        <Dialog>
                            <div className="popover">
                                <Switch defaultSelected>
                                    <div className="indicator" /> Dark Mode
                                </Switch>
                                <Button onPress={handleSignOut}>
                                    <span className="material-symbols-outlined">
                                        logout
                                    </span>
                                    <p>{loading ? 'Loading...' : 'Sign Out'}</p>
                                </Button>
                            </div>
                        </Dialog>
                    </Popover>
                </DialogTrigger>
                :
                <Button onPress={handleSignInClick}>
                    <span className="material-symbols-outlined">login</span>
                    <p>Sign In</p>
                </Button>
            }
        </header>
    );
}