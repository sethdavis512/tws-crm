import Heading from '~/components/Heading';
import heroImage from '../images/charlesdeluvio-Lks7vei-eAg-unsplash.jpg';
import { Button } from '@lemonsqueezy/wedges';
import { Urls } from '~/constants';
import { Link } from '@remix-run/react';

export default function HomeRoute() {
    return (
        <div className="col-span-full grid auto-rows-min grid-cols-subgrid gap-4 p-4 md:col-start-2 lg:col-start-3">
            <div className="col-span-full row-auto sm:flex sm:items-center md:col-span-5 lg:col-span-4">
                <div>
                    <Heading as="h1" size="1" className="mb-4">
                        Hey there!
                    </Heading>
                    <div className="space-y-4">
                        <p>
                            Welcome to my work-in-progress Customer Relations
                            Management (CRM) project.
                        </p>
                        <p>
                            This ongoing project is a showcase of my web
                            development skills, combining functionality, design,
                            and user experience to explore the
                            software-as-a-service space. As I continue to work
                            on this project, I aim to demonstrate my ability to
                            build a user-friendly and visually appealing
                            platform that delivers value to the end user.
                        </p>
                        <p>
                            Revisit this site as I intend to improve on it as
                            frequently as possible, and thank you for your
                            interest in my work!
                        </p>
                        <Button asChild>
                            <Link to={Urls.LOGIN}>Login to see more</Link>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="col-span-full row-start-1 md:col-span-5 md:row-start-auto md:p-4 lg:col-span-4">
                <img
                    src={heroImage}
                    alt="Two people sitting in front of their laptops discussing work items"
                    className="w-full rounded-lg"
                />
            </div>
        </div>
    );
}
