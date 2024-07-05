import { Button, Input, Link, Form, TextField } from 'react-aria-components';
import instagramIcn from './assets/instagram.svg';
import facebookIcn from './assets/facebook.svg';
import xIcn from './assets/x.svg';
import tiktokIcn from './assets/tiktok.svg';
import './footer.css';

export default function Footer() {
    return (
        <footer>
            <div className="subscribe-section">
                <p>Subscribe to our newsletters</p>
                <Form onSubmit={(e) => { e.preventDefault() }}>
                    <TextField name="email" type="email">
                        <Input placeholder='Email' />
                        <Button type="submit">Subscribe</Button>
                    </TextField>
                </Form>
            </div>
            <div className="social-media">
                <img src={instagramIcn} />
                <img src={facebookIcn} />
                <img src={xIcn} />
                <img src={tiktokIcn} />
            </div>
            <div className="copyright">
                <p>© 2024 Guitar gems company. All Rights Reserved</p>
                <div className="terms">
                    <Link href="">Privacy & Policy</Link>
                    <Link href="">Terms & Condition</Link>
                </div>
            </div>
        </footer>
    );
}