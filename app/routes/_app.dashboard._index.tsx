import Divider from '~/components/Divider';
import Heading from '~/components/Heading';

export default function DashboardRoute() {
    return (
        <>
            <Heading size="2" className="mb-4">
                Let's get started
            </Heading>
            <p>
                Ready to transform your customer relations? Dive in and explore
                all the amazing tools and tips we have just for you. Let's make
                your CRM experience extraordinary! 🚀
            </p>
            <Divider className="my-8" />
            <Heading as="h3" size="3" className="mb-8">
                Here's a few highlights on our features
            </Heading>
            <ul className="space-y-8">
                <li>
                    <Heading as="h4" size="4" className="mb-4">
                        Companies
                    </Heading>
                    📂 Easily manage all your business partners and vendors in
                    one place. Keep track of vital info, update details on the
                    fly, and streamline your business relationships. Let's keep
                    your network organized and thriving.
                </li>
                <li>
                    <Heading as="h4" size="4" className="mb-4">
                        Customers Directory
                    </Heading>
                    👋 All your customer info, all in one spot. Effortlessly
                    manage contacts, track interactions, and ensure every
                    customer feels valued. Dive in and make customer happiness
                    your superpower.
                </li>
            </ul>
            <Divider className="my-8" />
            <Heading as="h3" size="3" className="mb-8">
                Features coming soon
            </Heading>
            <ul className="space-y-8">
                <li>
                    <Heading as="h4" size="4" className="mb-4">
                        Deals Listing
                    </Heading>
                    💼 Stay on top of every opportunity with a clear view of all
                    your deals. Track progress, update statuses, and close more
                    deals faster. Let's turn those prospects into profits.
                </li>
                <li>
                    <Heading as="h4" size="4" className="mb-4">
                        Leads Listing
                    </Heading>
                    📋 Capture and manage potential customers with ease. Keep
                    track of new leads, nurture relationships, and convert them
                    into loyal clients. Your next big win is just a click away.
                </li>
            </ul>
        </>
    );
}
