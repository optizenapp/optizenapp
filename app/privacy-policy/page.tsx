import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | OptizenApp',
  description:
    'Privacy policy for OptizenApp detailing data collection, usage, storage, and your rights regarding personal information.',
  alternates: {
    canonical: 'https://optizenapp.com/privacy-policy',
  },
};

const sections: { title: string; paragraphs: string[] }[] = [
  {
    title: 'Who we are',
    paragraphs: ['Our website address is: https://optizenapp.com.'],
  },
  {
    title: 'Comments',
    paragraphs: [
      "When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor's IP address and browser user agent string to help spam detection.",
      'An anonymised string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: https://automattic.com/privacy/. After approval of your comment, your profile picture is visible to the public in the context of your comment.',
    ],
  },
  {
    title: 'Media',
    paragraphs: [
      'If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.',
    ],
  },
  {
    title: 'Cookies',
    paragraphs: [
      'If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.',
      'If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.',
      'When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select "Remember Me", your login will persist for two weeks. If you log out of your account, the login cookies will be removed.',
      'If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.',
    ],
  },
  {
    title: 'Embedded content from other websites',
    paragraphs: [
      'Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.',
      'These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.',
    ],
  },
  {
    title: 'Who we share your data with',
    paragraphs: [
      'If you request a password reset, your IP address will be included in the reset email.',
    ],
  },
  {
    title: 'How long we retain your data',
    paragraphs: [
      'If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognise and approve any follow-up comments automatically instead of holding them in a moderation queue.',
      'For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.',
    ],
  },
  {
    title: 'What rights you have over your data',
    paragraphs: [
      'If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.',
    ],
  },
  {
    title: 'Where we send your data',
    paragraphs: [
      'Visitor comments may be checked through an automated spam detection service.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-16">
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="mt-3 text-gray-600">
              How OptizenApp collects, uses, and protects your information.
            </p>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
              <div className="space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
          <p className="text-sm text-gray-500 pt-4 border-t border-gray-200">
            Questions about this policy? Contact us at{' '}
            <a href="mailto:team@optizenapp.com" className="text-optizen-blue-600 hover:underline">
              team@optizenapp.com
            </a>
            .
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
