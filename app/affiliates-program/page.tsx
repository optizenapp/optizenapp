import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { generateSchemaOrg } from "@/lib/schema-generator";

export const metadata = {
  title: "Affiliate Program - OptizenAI | 25% Recurring Commissions",
  description: "Join the OptizenAI Affiliate Program and earn 25% recurring commissions for life. $50 payout threshold. Promote our Shopify SEO and Video Upsell apps.",
};

export default async function AffiliateProgramPage() {
  // Generate schema for this page
  const schema = await generateSchemaOrg({
    url: 'https://optizenapp.com/affiliates-program',
    title: 'Affiliate Program - OptizenAI | 25% Recurring Commissions',
    content: `
      Join The OptizenAI Affiliate Program
      
      Anyone is welcome to join the OptizenAI affiliate program.
      
      Program Details:
      - 25% recurring commissions for the life of installed app
      - 25% on AI usage plans
      - $50 payout threshold
      
      Complete terms and conditions for the OptizenAI affiliate program including program details, affiliate obligations, payment terms, and promotion restrictions.
    `,
    excerpt: 'Join the OptizenAI Affiliate Program and earn 25% recurring commissions for life. $50 payout threshold.',
    author: 'OptizenAI',
    datePublished: '2024-01-01T00:00:00Z',
    dateModified: '2024-01-01T00:00:00Z',
    category: 'affiliate program',
    siteInfo: {
      name: 'OptizenAI',
      url: 'https://optizenapp.com',
      logoUrl: 'https://optizenapp.com/optizen-logo.png',
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-optizen-blue-500 to-optizen-green-500 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join The OptizenAI Affiliate Program
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Anyone is welcome to join the OptizenAI affiliate program.
            </p>
          </div>
        </section>

        {/* Program Details */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-optizen-blue-50 to-optizen-green-50 rounded-2xl p-8 md:p-12 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Program Details</h2>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start">
                  <span className="text-optizen-blue-500 font-bold mr-3">✓</span>
                  <span className="text-gray-700"><strong>25% recurring commissions</strong> for the life of installed app</span>
                </li>
                <li className="flex items-start">
                  <span className="text-optizen-blue-500 font-bold mr-3">✓</span>
                  <span className="text-gray-700"><strong>25% on AI usage plans</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-optizen-blue-500 font-bold mr-3">✓</span>
                  <span className="text-gray-700"><strong>$50 payout threshold</strong></span>
                </li>
              </ul>
              <div className="mt-8 text-center">
                <a
                  href="https://platform.shoffi.app/signup/affiliate?app=Il_IuhPnJ7j"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-optizen-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-optizen-blue-600 transition-colors"
                >
                  Sign Up Here
                </a>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Terms</h2>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Overview</h3>
              <p className="text-gray-700 mb-4">
                This Agreement contains the complete terms and conditions that apply to you becoming an affiliate in the Optizenapp.com Affiliate Program. The purpose of this Agreement is to allow HTML linking between your web site and the Optizenapp.com web site. Please note that throughout this Agreement, "we," "us," and "our" refer to Optizenapp.com, and "you," "your," and "yours" refer to the affiliate.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Affiliate Obligations</h3>
              <p className="text-gray-700 mb-4">
                <strong>2.1.</strong> To begin the enrollment process, you will complete and submit the online application at the ShareASale.com server. The fact that we auto-approve applications does not imply that we may not re-evaluate your application at a later time. We may reject your application at our sole discretion. We may cancel your application if we determine that your site is unsuitable for our Program, including if it:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>2.1.1. Promotes sexually explicit materials</li>
                <li>2.1.2. Promotes violence</li>
                <li>2.1.3. Promotes discrimination based on race, sex, religion, nationality, disability, sexual orientation, or age</li>
                <li>2.1.4. Promotes illegal activities</li>
                <li>2.1.5. Incorporates any materials which infringe or assist others to infringe on any copyright, trademark or other intellectual property rights or to violate the law</li>
                <li>2.1.6. Includes "Merchant" or variations or misspellings thereof in its domain name</li>
                <li>2.1.7. Is otherwise in any way unlawful, harmful, threatening, defamatory, obscene, harassing, or racially, ethnically or otherwise objectionable to us in our sole discretion.</li>
                <li>2.1.8. Contains software downloads that potentially enable diversions of commission from other affiliates in our program.</li>
                <li>2.1.9. You may not create or design your website or any other website that you operate, explicitly or implied in a manner which resembles our website nor design your website in a manner which leads customers to believe you are Optizenapp.com or any other affiliated business.</li>
              </ul>

              <p className="text-gray-700 mb-4">
                <strong>2.2.</strong> As a member of Optizenapp.com's Affiliate Program, you will have access to Affiliate Account Manager. Here you will be able to review our Program's details and previously-published affiliate newsletters, download HTML code (that provides for links to web pages within the Optizenapp.com web site) and banner creatives, browse and get tracking codes for our coupons and deals. In order for us to accurately keep track of all guest visits from your site to ours, you must use the HTML code that we provide for each banner, text link, or other affiliate link we provide you with.
              </p>

              <p className="text-gray-700 mb-4">
                <strong>2.3.</strong> Optizenapp.com reserves the right, at any time, to review your placement and approve the use of Your Links and require that you change the placement or use to comply with the guidelines provided to you.
              </p>

              <p className="text-gray-700 mb-4">
                <strong>2.4.</strong> The maintenance and the updating of your site will be your responsibility. We may monitor your site as we feel necessary to make sure that it is up-to-date and to notify you of any changes that we feel should enhance your performance.
              </p>

              <p className="text-gray-700 mb-4">
                <strong>2.5.</strong> It is entirely your responsibility to follow all applicable intellectual property and other laws that pertain to your site. You must have express permission to use any person's copyrighted material, whether it be a writing, an image, or any other copyrightable work. We will not be responsible (and you will be solely responsible) if you use another person's copyrighted material or other intellectual property in violation of the law or any third party rights.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Optizenapp.com Rights and Obligations</h3>
              <p className="text-gray-700 mb-4">
                <strong>3.1.</strong> We have the right to monitor your site at any time to determine if you are following the terms and conditions of this Agreement. We may notify you of any changes to your site that we feel should be made, or to make sure that your links to our web site are appropriate and to notify further you of any changes that we feel should be made. If you do not make the changes to your site that we feel are necessary, we reserve the right to terminate your participation in the Optizenapp.com Affiliate Program.
              </p>

              <p className="text-gray-700 mb-4">
                <strong>3.2.</strong> Optizenapp.com reserves the right to terminate this Agreement and your participation in the Optizenapp.com Affiliate Program immediately and without notice to you should you commit fraud in your use of the Optizenapp.com Affiliate Program or should you abuse this program in any way. If such fraud or abuse is detected, Optizenapp.com shall not be liable to you for any commissions for such fraudulent sales.
              </p>

              <p className="text-gray-700 mb-4">
                <strong>3.3.</strong> This Agreement will begin upon our acceptance of your Affiliate application, and will continue unless terminated hereunder.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Termination</h3>
              <p className="text-gray-700 mb-4">
                Either you or we may end this Agreement AT ANY TIME, with or without cause, by giving the other party written notice. Written notice can be in the form of mail, email or fax. In addition, this Agreement will terminate immediately upon any breach of this Agreement by you.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Modification</h3>
              <p className="text-gray-700 mb-4">
                We may modify any of the terms and conditions in this Agreement at any time at our sole discretion. In such event, you will be notified by email. Modifications may include, but are not limited to, changes in the payment procedures and Optizenapp.com's Affiliate Program rules. If any modification is unacceptable to you, your only option is to end this Agreement. Your continued participation in Optizenapp.com's Affiliate Program following the posting of the change notice or new Agreement on our site will indicate your agreement to the changes.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Payment</h3>
              <p className="text-gray-700 mb-4">
                Optizenapp.com uses a third party to handle all of the tracking and payment. The third party is the ShareASale.com affiliate network. Kindly review the network's payment terms and conditions.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Access to Affiliate Account Interface</h3>
              <p className="text-gray-700 mb-4">
                You will create a password so that you may enter ShareASale's secure affiliate account interface. From their site you will be able to receive your reports that will describe our calculation of the commissions due to you.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Promotion Restrictions</h3>
              <p className="text-gray-700 mb-4">
                <strong>8.1.</strong> You are free to promote your own web sites, but naturally any promotion that mentions Optizenapp.com could be perceived by the public or the press as a joint effort. You should know that certain forms of advertising are always prohibited by Optizenapp.com. For example, advertising commonly referred to as "spamming" is unacceptable to us and could cause damage to our name. Other generally prohibited forms of advertising include the use of unsolicited commercial email (UCE), postings to non-commercial newsgroups and cross-posting to multiple newsgroups at once. In addition, you may not advertise in any way that effectively conceals or misrepresents your identity, your domain name, or your return email address. You may use mailings to customers to promote Optizenapp.com so long as the recipient is already a customer or subscriber of your services or web site, and recipients have the option to remove themselves from future mailings. Also, you may post to newsgroups to promote Optizenapp.com so long as the news group specifically welcomes commercial messages. At all times, you must clearly represent yourself and your web sites as independent from Optizenapp.com. If it comes to our attention that you are spamming, we will consider that cause for immediate termination of this Agreement and your participation in the Optizenapp.com Affiliate Program. Any pending balances owed to you will not be paid if your account is terminated due to such unacceptable advertising or solicitation.
              </p>

              <p className="text-gray-700 mb-4">
                <strong>8.2.</strong> Affiliates that among other keywords or exclusively bid in their Pay-Per-Click campaigns on keywords such as Optizenapp.com, Optizenapp, www.Optizenapp.com, and/or any misspellings or similar alterations of these – be it separately or in combination with other keywords – and do not direct the traffic from such campaigns to their own website prior to re-directing it to ours, will be considered trademark violators, and will be banned from Merchant's Affiliate Program. We will do everything possible to contact the affiliate prior to the ban. However, we reserve the right to expel any trademark violator from our affiliate program without prior notice, and on the first occurrence of such PPC bidding behavior.
              </p>

              <p className="text-gray-700 mb-4">
                <strong>8.3.</strong> Affiliates are not prohibited from keying in prospect's information into the lead form as long as the prospects' information is real and true, and these are valid leads (i.e. sincerely interested in Optizenapp.com's service).
              </p>

              <p className="text-gray-700 mb-4">
                <strong>8.4.</strong> Affiliate shall not transmit any so-called "interstitials," "Parasiteware™," "Parasitic Marketing," "Shopping Assistance Application," "Toolbar Installations and/or Add-ons," "Shopping Wallets" or "deceptive pop-ups and/or pop-unders" to consumers from the time the consumer clicks on a qualifying link until such time as the consumer has fully exited Optizenapp.com's site (i.e., no page from our site or any Optizenapp.com's content or branding is visible on the end-user's screen).
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Grant of Licenses</h3>
              <p className="text-gray-700 mb-4">
                <strong>9.1.</strong> We grant to you a non-exclusive, non-transferable, revocable right to (i) access our site through HTML links solely in accordance with the terms of this Agreement and (ii) solely in connection with such links, to use our logos, trade names, trademarks, and similar identifying material (collectively, the "Licensed Materials") that we provide to you or authorize for such purpose. You are only entitled to use the Licensed Materials to the extent that you are a member in good standing of Optizenapp.com's Affiliate Program. You agree that all uses of the Licensed Materials will be on behalf of Optizenapp.com and the good will associated therewith will inure to the sole benefit of Optizenapp.com.
              </p>

              <p className="text-gray-700 mb-4">
                <strong>9.2.</strong> Each party agrees not to use the other's proprietary materials in any manner that is disparaging, misleading, obscene or that otherwise portrays the party in a negative light. Each party reserves all of its respective rights in the proprietary materials covered by this license. Other than the license granted in this Agreement, each party retains all right, title, and interest to its respective rights and no right, title, or interest is transferred to the other.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Disclaimer</h3>
              <p className="text-gray-700 mb-4">
                Optizenapp.com MAKES NO EXPRESS OR IMPLIED REPRESENTATIONS OR WARRANTIES REGARDING Optizenapp.com SERVICE AND WEB SITE OR THE PRODUCTS OR SERVICES PROVIDED THEREIN, ANY IMPLIED WARRANTIES OF Optizenapp.com ABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT ARE EXPRESSLY DISCLAIMED AND EXCLUDED. IN ADDITION, WE MAKE NO REPRESENTATION THAT THE OPERATION OF OUR SITE WILL BE UNINTERRUPTED OR ERROR FREE, AND WE WILL NOT BE LIABLE FOR THE CONSEQUENCES OF ANY INTERRUPTIONS OR ERRORS.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Representations and Warranties</h3>
              <p className="text-gray-700 mb-4">You represent and warrant that:</p>
              <p className="text-gray-700 mb-4">
                <strong>11.1.</strong> This Agreement has been duly and validly executed and delivered by you and constitutes your legal, valid, and binding obligation, enforceable against you in accordance with its terms;
              </p>
              <p className="text-gray-700 mb-4">
                <strong>11.2.</strong> You have the full right, power, and authority to enter into and be bound by the terms and conditions of this Agreement and to perform your obligations under this Agreement, without the approval or consent of any other party;
              </p>
              <p className="text-gray-700 mb-4">
                <strong>11.3.</strong> You have sufficient right, title, and interest in and to the rights granted to us in this Agreement.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Limitations of Liability</h3>
              <p className="text-gray-700 mb-4">
                WE WILL NOT BE LIABLE TO YOU WITH RESPECT TO ANY SUBJECT MATTER OF THIS AGREEMENT UNDER ANY CONTRACT, NEGLIGENCE, TORT, STRICT LIABILITY OR OTHER LEGAL OR EQUITABLE THEORY FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL OR EXEMPLARY DAMAGES (INCLUDING, WITHOUT LIMITATION, LOSS OF REVENUE OR GOODWILL OR ANTICIPATED PROFITS OR LOST BUSINESS), EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. FURTHER, NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED IN THIS AGREEMENT, IN NO EVENT SHALL Optizenapp.com's CUMULATIVE LIABILITY TO YOU ARISING OUT OF OR RELATED TO THIS AGREEMENT, WHETHER BASED IN CONTRACT, NEGLIGENCE, STRICT LIABILITY, TORT OR OTHER LEGAL OR EQUITABLE THEORY, EXCEED THE TOTAL COMMISSION FEES PAID TO YOU UNDER THIS AGREEMENT.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. Indemnification</h3>
              <p className="text-gray-700 mb-4">
                You hereby agree to indemnify and hold harmless Optizenapp.com, and its subsidiaries and affiliates, and their directors, officers, employees, agents, shareholders, partners, members, and other owners, against any and all claims, actions, demands, liabilities, losses, damages, judgments, settlements, costs, and expenses (including reasonable attorneys' fees) insofar as such Losses (or actions in respect thereof) arise out of or are based on (i) any claim that our use of the affiliate trademarks infringes on any trademark, trade name, service mark, copyright, license, intellectual property, or other proprietary right of any third party, (ii) any misrepresentation of a representation or warranty or breach of a covenant and agreement made by you herein, or (iii) any claim related to your site, including, without limitation, content therein not attributable to us.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">14. Confidentiality</h3>
              <p className="text-gray-700 mb-4">
                All confidential information, including, but not limited to, any business, technical, financial, and customer information, disclosed by one party to the other during negotiation or the effective term of this Agreement which is marked "Confidential," will remain the sole property of the disclosing party, and each party will keep in confidence and not use or disclose such proprietary information of the other party without express written permission of the disclosing party.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">15. Miscellaneous</h3>
              <p className="text-gray-700 mb-4">
                <strong>15.1.</strong> You agree that you are an independent contractor, and nothing in this Agreement will create any partnership, joint venture, agency, franchise, sales representative, or employment relationship between you and Optizenapp.com. You will have no authority to make or accept any offers or representations on our behalf. You will not make any statement, whether on Your Site or any other of Your Site or otherwise, that reasonably would contradict anything in this Section.
              </p>

              <p className="text-gray-700 mb-4">
                <strong>15.2.</strong> Neither party may assign its rights or obligations under this Agreement to any party, except to a party who obtains all or substantially all of the business or assets of a third party.
              </p>

              <p className="text-gray-700 mb-4">
                <strong>15.3.</strong> This Agreement shall be governed by and interpreted in accordance with the laws of the State of New York without regard to the conflicts of laws and principles thereof.
              </p>

              <p className="text-gray-700 mb-4">
                <strong>15.4.</strong> You may not amend or waive any provision of this Agreement unless in writing and signed by both parties.
              </p>

              <p className="text-gray-700 mb-4">
                <strong>15.5.</strong> This Agreement represents the entire agreement between us and you, and shall supersede all prior agreements and communications of the parties, oral or written.
              </p>

              <p className="text-gray-700 mb-4">
                <strong>15.6.</strong> The headings and titles contained in this Agreement are included for convenience only, and shall not limit or otherwise affect the terms of this Agreement.
              </p>

              <p className="text-gray-700 mb-4">
                <strong>15.7.</strong> If any provision of this Agreement is held to be invalid or unenforceable, that provision shall be eliminated or limited to the minimum extent necessary such that the intent of the parties is effectuated, and the remainder of this agreement shall have full force and effect.
              </p>
            </div>

            {/* CTA Section */}
            <div className="mt-12 text-center bg-gradient-to-br from-optizen-blue-50 to-optizen-green-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
              <p className="text-gray-700 mb-6">
                Join thousands of affiliates earning recurring commissions with OptizenAI
              </p>
              <a
                href="https://platform.shoffi.app/signup/affiliate?app=Il_IuhPnJ7j"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-optizen-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-optizen-blue-600 transition-colors"
              >
                Sign Up Now
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

