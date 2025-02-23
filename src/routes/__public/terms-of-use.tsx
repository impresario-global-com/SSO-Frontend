import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/shared/navbar.tsx';
import Footer from '@/components/footer.tsx';
import AppError from '@/components/shared/app-error.tsx';
import CommonLayout from '@/layouts/common-layout.tsx';

export function Component() {
    const navigate = useNavigate();

    return (
        <CommonLayout gradientVariant="dual">
            <div className="m-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Navbar/>
                <div className="post">
                    <div className="title flex flex-col justify-start flex-shrink-0">
                        <h1 className="text-center text-2xl font-bold">Terms of Use</h1>
                        <br/>
                    </div>
                    <div className="content flex flex-col justify-start flex-shrink-0">
                        <p className="font-bold">HELLO and <strong>WELCOME</strong> to our website. These Terms of Use
                            have been posted to be in compliance with numerous laws that regulate the operation of an
                            Internet website. The Terms of Use cover a variety of important issues, including the
                            protection of copyrighted material and other intellectual property, and the presentation,
                            collection and use of information.</p>
                        <p>These Terms of Use apply to your use of this website and to: (a) all websites owned and/or
                            provided by IMGlobal Media Private Limited (“<strong>I.M</strong>”) including all services
                            offered through this website and/or any other I.M website; (b) all software offerings and
                            applications owned and/or provided by I.M and/or available on or through this website or any
                            other I.M website; and (c) all web pages, data, text, images, photographs, illustrations,
                            graphics, audio, video, and documents including articles, marketing materials, press
                            releases and other information and content available on or through this website or any I.M
                            website.</p>
                        <p>I.M may revise these Terms of Use over time as new features are added to the website or as
                            Internet law and standards evolve. We will post those changes prominently but recommend that
                            you read these Terms of Use periodically when you visit the website.</p>
                        <p>DEFINITIONS</p>
                        <ol>
                            <li><strong>Agreement</strong>: Please read the Terms of Use thoroughly before using this
                                website or any other websites or Apps owned and operated by IMGlobal Media Private
                                Limited (“<strong>I.M</strong>”). These Terms of Use showcase a contract between you and
                                I.M, and the use of this Website constitutes a User’s agreement to be bound by all
                                terms. Please do not enter or use our Website in case you disagree with one or more of
                                the terms or find them unacceptable. Your continued participation on this website
                                indicates your acceptance of this Terms of Use, including your acceptance of the Privacy
                                Policy and of the collection, use, disclosure, management and storage of your Personal
                                Information (as defined in the Privacy Policy). All the rights not expressly granted
                                herein are reserved to I.M, and any violation of these Terms of Use may lead to denial
                                of usage and access to the Website and application as well as any other applicable legal
                                remedy.
                            </li>
                            <li><strong>Updates and Changes</strong>: I.M reserves the right to modify its Privacy
                                Policy as well as these Terms of Use at any time. Such changes are inclusive of
                                retroactive changes, and these are effective once posted on this or a similar page of
                                the I.M Website. This entire Website, features of this Website, or specific pages may be
                                changed or discontinued without prior notice.
                            </li>
                            <li><strong>Last Update</strong>: These Terms and Conditions were last updated on
                                28.01.2025.
                            </li>
                            <li><strong>Access</strong>: Users must agree that they will not attempt to access any
                                secure or restricted portion of this Website to which they have not been granted access
                                specifically.
                            </li>
                            <li><strong>Comply with Laws</strong>: A user must comply with all the applicable
                                regulations and laws as practiced in the land of access.
                            </li>
                            <li><strong>Term and Termination</strong>: This Agreement for I.M begins on the date a user
                                accesses this Website and continues for a period one (1) year. This Agreement may
                                automatically terminate if you breach any Terms of Use. The Terms of Use also terminates
                                immediately upon notice from I.M for any reason and/or no reason. When this Agreement
                                terminates, users must agree to stop using it immediately or accessing this website so
                                as to destroy all copies of information or content from this website. All terms that, by
                                their nature, intended to survive termination or expiration of this Agreement do
                                survive.
                            </li>
                        </ol>
                        <p>You agree that you will not access or use the website in any manner that could damage,
                            disable, impair or cause undue burden on the website and/or its host, servers, network,
                            systems or other users. You agree that you will not attempt to interfere in any way with the
                            operation of the website (including with the delivery of any Services), that you will not
                            engage in flooding, spamming, mail-bombing, crashing or otherwise sending unsolicited email
                            to other users of the website. You further agree that you will not attempt to access data
                            that is not intended for your use, that you will not attempt to log on to a server or
                            account that you are not authorized to access, and that you will not probe, scan or test the
                            vulnerability of any system or network related in any way to the website without
                            authorization.</p>
                        <ol start="7">
                            <li><strong>Submissions Of User Content By You</strong>: In the event that you transmit or
                                post any User Content on or to the Website, you (1) represent and warrant to I.M that
                                you have obtained all necessary licenses, consents, waivers, releases, authorizations
                                and/or permissions to post or transmit such User Content; and (2) grant to I.M an
                                irrevocable, worldwide, nonexclusive, perpetual, fully sub-licensable, royalty-free
                                right and license to use, reproduce, modify, adapt, publish, translate, create
                                derivative works from, distribute, transmit, publicly perform, and publicly display such
                                Content (in whole or part) and/or to incorporate it (in whole or in part) in other works
                                in any form, media, or technology now known or later developed. You acknowledge that any
                                User Content submitted by you may be handled by I.M on a non-confidential basis.
                            </li>
                            <li><strong>Prohibited Activities</strong>: The content and information on this website
                                (including, but not limited to, messages, data, information, text, music, sound, photos,
                                graphics, video, maps, icons, software, code, or other material), as well as the
                                infrastructure used to provide such content and information, is proprietary to us,
                                except as expressly stated and/or where credit to an external party is acknowledged and
                                given for fair use. You agree not to otherwise modify, copy, distribute, transmit,
                                display, perform, reproduce, publish, license, create derivative works from, transfer,
                                or sell or re-sell any such content or information obtained from or through this
                                website.
                            </li>
                        </ol>
                        <p>Additionally, you agree not to:</p>
                        <ol>
                            <li>Use this website or its contents for any commercial purpose without our express written
                                permission;
                            </li>
                            <li>Access, monitor, or copy any content or information of this website using any robot,
                                spider, scraper, or other automated means or any manual process for any purpose without
                                our express written permission;
                            </li>
                            <li>Violate the restrictions in any robot exclusion headers on this website or bypass or
                                circumvent other measures employed to prevent or limit access to this website;
                            </li>
                            <li>Take any action that imposes, or may impose, in our discretion, an unreasonable or
                                disproportionately large load on our infrastructure;
                            </li>
                            <li>Deep-link to any portion of this website for any purpose without our express written
                                permission;
                            </li>
                            <li>“frame”, “mirror”, or otherwise incorporate any part of this website into any other
                                website or mobile application without our prior written authorization;
                            </li>
                            <li>Attempt to modify, translate, adapt, edit, decompile, disassemble, or reverse engineer
                                any software programs used by I.M in connection with this website or the content we
                                provide;
                            </li>
                            <li>Post reviews on products or services offered by your current employer or by direct
                                competitors of your current employer;
                            </li>
                            <li>Log in using an alias that masks your true identity, or attempt to gain unauthorized
                                access to the I.M Community and/or website;
                            </li>
                            <li>Collect and disclose any private information of any person within the I.M Community;
                            </li>
                            <li>Post job postings, solicitations, or other advertisements, without our express written
                                permission.
                            </li>
                        </ol>
                        <ol start="9">
                            <li><strong>Software</strong>: You acknowledge that these Terms of Use govern your use of
                                any Software (as defined above) provided by I.M and/or made available through the
                                website, whether or not there are license agreements and/or end user agreements. Unless
                                otherwise agreed in writing, you acknowledge that (1) You shall not attempt to alter or
                                modify the Software; (2) you shall not reverse engineer, decompile, or otherwise attempt
                                to gain access to the source code for the Software; (3) you shall not attempt to
                                circumvent or disable the Software or its intended purpose; and (4) you shall not copy,
                                sublicense, assign, transfer, distribute, transmit or otherwise use the Software without
                                the express prior written consent of I.M.
                            </li>
                            <li><strong>Copyrights and Trademarks</strong>: The trademarks, service marks, trade names,
                                and logos (“<strong>Trademarks</strong>”) appearing on this website, including without
                                limitation IMGlobal Media Private Limited® and/or its distinctive logo. All other
                                contents with our logo and copyright are copyrighted works of I.M, and may not be
                                copied, imitated, or used, in whole or in part, without the prior written permission of
                                I.M. Resharing of the content for non-commercial purposes is allowed post permission,
                                but reposting isn’t.
                            </li>
                        </ol>
                        <ul>
                            <li>To repost any content piece, a user must seek permission from I.M and website credits
                                while posting.
                            </li>
                            <li>The format of reposting will also be approved by I.M before the content gets reposted.
                            </li>
                            <li>The “content” in question is also applicable to the texts and scripts. No individual or
                                company shall use our content to recreate their posts without our permission.
                            </li>
                        </ul>
                        <p>From time to time, I.M will legally utilize intellectual property owned by third parties
                            related to our services. Nothing in this Agreement shall be construed as granting any
                            license or right to use any Trademark or Copyright without the express written permission.
                            Misusing the Trademark or Copyrighted works by I.M displayed on this website, or any other
                            content platform, including social media, is strictly prohibited and may expose you to
                            liability.</p>
                        <p>In general, and unless otherwise posted, you may review and print copies of material from the
                            website, provided that the material (1) is used only for non-commercial purposes, and (2)
                            retains, without alteration, all copyright, trademark, and other proprietary notices
                            displayed on the material as posted on the website.</p>
                        <p>You are not permitted to make or distribute copies of material on the website for any
                            commercial purpose without prior written permission from I.M. I.M has a policy of
                            terminating services to users who willfully and/or repeatedly infringe.</p>
                        <p>Except as otherwise noted, all content of the website is wholly owned property of IMGlobal
                            Media Private Limited®</p>
                        <ol start="11">
                            <li>If a user believes that any other person using the I.M Website has violated any terms in
                                this Agreement, we request the user to notify us immediately, specifically identifying
                                the materials or conduct at issue. Please contact our representatives at I.M using the
                                contact information provided on our website.
                            </li>
                            <li><strong>User Postings, Chat, and Messages; Privacy Policy</strong>: The Website, or
                                other communications to you from I.M, such as email, may provide you with the
                                opportunity to post comments, answer questions, add feedback, other messages, or the
                                opportunity to communicate with I.M. All such communications provided by users on or
                                through this Website, or sent to I.M by mail, email, or other means (collectively,
                                “Messages and Postings”) may be used by us in our business operation, subject to the
                                limitations and protections described in detail in our Privacy Policy. You hereby grant
                                I.M a worldwide, perpetual, unrestricted, royalty-free, irrevocable license to use,
                                display, reproduce, modify, perform, create derivative or collective works, distribute
                                and transmit your Messages and Postings, and agree that I.M is free to use such Messages
                                and Postings for any purpose and in any medium. You further grant I.M the right to
                                assign or sublicense any of the foregoing rights to others. I.M does not have the duty,
                                but the right, to delete any Messages and Postings for any reason, including without
                                limitation if it deems in its sole discretion that the Messages and Postings are
                                offensive or inappropriate in any manner.
                            </li>
                            <li><strong>Communication with You</strong>: A user must agree that I.M may communicate with
                                them via emails or any other method using the contact information that has been provided
                                to us.
                            </li>
                            <li><strong>Privacy and Security</strong>: You understand and agree that I.M will handle
                                information and data as described in the Privacy Policy. It is also free to be modified
                                from time to time. However, I.M can not and does not guarantee absolute security. We are
                                not responsible for any illegal acts of third parties- including hacking or any other
                                similar activities.
                            </li>
                            <li><strong>Independent Contractor</strong>: I.M and you are independent contractors to each
                                other. You are not I.M’s agent or employee for any purpose and shall not hold yourself
                                out as an I.M agent or employee.
                            </li>
                            <li><strong>Disclaimers And Limitation Of Liabilities And Warranties</strong>: The website
                                may contain technical inaccuracies, typographical errors, and out of date information.
                                I.M makes no representations as to the accuracy, reliability, completeness, or
                                timeliness of the information posted, and I.M makes no warranty that the Website will
                                meet your requirements. I.M reserves the right to make changes to the Website at any
                                time. You understand, acknowledge, and agree that your use of this website, including
                                the software and services offered on or through the website, is at your own risk. I.M
                                shall not be liable for any special, direct, indirect, incidental, punitive, or
                                consequential damages, including without limitation, lost revenues or lost profits,
                                which may result from the use of, access to, or inability to use the software, services
                                and/or website. I.M makes no warranty, express or implied, as to the merchantability or
                                fitness for a particular purpose with respect to any software, materials and/ or
                                services available from the website, all of which are being offered “as is”. I.M makes
                                no warranty of noninfringement. I.M assumes no responsibility and shall not be liable
                                for any damages to, or viruses that may infect, your computer equipment or other
                                property on account of your access to, use of, or browsing the website or your
                                downloading of any software or materials from the website.
                            </li>
                            <li><strong>Indemnification</strong>: You shall indemnify and hold harmless I.M, its
                                affiliates, officers, employees, and agents, from and against any and all liability,
                                losses, claims, demands, disputes, damages, and costs of any kind, including, without
                                limitation, reasonable attorneys’ fees and costs of litigation resulting from or in any
                                way connected with your use of the website, including any Software and/or Services
                                offered through the website, Content that you submit through the website, and/or your
                                breach of any of the provisions of the Terms of Use and/or the Privacy Policy.
                            </li>
                            <li><strong>Dispute Resolution</strong>: Any action based on a breach of any provision of
                                these Terms of Use shall be brought to the Courts of India. If a breach is found by the
                                court, the court of Lucknow Uttar Pradesh shall be the exclusive jurisdiction for any
                                proceedings. Any breach shall institute I.M to have the right to issue an injunction,
                                and grant to I.M its damages and attorneys’ fees and such other and further relief as
                                the court may deem appropriate.
                            </li>
                            <li><strong>Contact Information</strong>: Our contact information is
                                contact@impresario-global.com. You can get in touch with us directly for concerns or
                                disagreements or similar reasons.
                            </li>
                            <li><strong>Compliance With Laws</strong>: You agree that you will not use the website or
                                the Software or Services provided on or through the website for any purpose that is
                                prohibited by these Terms of Use or that is unlawful. Further, you agree not to access,
                                download, use or export the website or Software or Services provided on or through the
                                website, in violation of any applicable laws, rules or regulations. You agree to comply
                                with all export laws and restrictions and regulations of India, and not to directly or
                                indirectly provide or otherwise make available the website or Software or Services
                                provided on or through the website in violation of any such restrictions, laws, rules or
                                regulations, or without all necessary approvals.
                            </li>
                            <li><strong>Miscellaneous</strong>: In case the provision of these Terms of Use is held to
                                be invalid, overbroad, or unenforceable, such provision shall be deemed amended to the
                                minimum necessary extent to render such provision enforceable and valid. If any
                                provision can not be deemed amended reasonably, then such provisions shall be struck,
                                and only the remaining provisions shall be enforced. The headings are only there for
                                reference purposes and in no way limit, define, describe, or construe the scope or
                                extent of such section. Users may not assign, sell, or otherwise transfer any rights of
                                I.M under these Terms of Use. I.M may transfer or assign its rights and obligations
                                under these Terms of Use and our failure to act concerning any failure by you or others
                                to comply with these Terms of Use does not waive our right to act concerning subsequent
                                or similar failures. These Terms of Use, along with any updates or changes or
                                modifications thereto by us as described above, set forth the entire understanding and
                                agreement between us with respect to the subject matter hereof.
                            </li>
                            <li><strong>Force Majeure</strong>: Notwithstanding any other provision contained in these
                                Terms of Use, in the event that the performance of any obligation of I.M is prevented
                                due to acts of God or any government restriction, wars, hostilities, blockades, civil
                                disturbances, strikes, lockouts, or any other cause beyond the reasonable control of
                                I.M, then I.M shall not be responsible to you for any failure or delay in the
                                performance of its obligations. I.M shall promptly notify you of such force majeure
                                conditions. The terms of this clause shall not exempt, but merely suspend, I.M from its
                                duty to perform until as soon as practicable after a force majeure condition ceases to
                                exist.
                            </li>
                            <li><strong>Invalidity Of Provisions</strong>: In the event that any portion of these Terms
                                of Use is held to be unenforceable, the unenforceable portion shall be construed in
                                accordance with applicable law as nearly as possible to reflect the original intention
                                and the remainder of the provisions shall remain in full force and effect.
                            </li>
                            <li><strong>No Waiver</strong>: Any failure by I.M to insist upon or enforce strict
                                performance of any provision of these Terms of Use shall not be construed as a waiver of
                                any provision or right.
                            </li>
                            <li><strong>Product pricing</strong>: For pledges the minimum amount is set at INR 100.
                                There is no maximum limit.
                            </li>
                        </ol>
                        <p>If you have any questions about our Terms & Conditions, please contact us by email at <a
                            href="mailto:contact@impresario-global.com"
                            className="text-blue-600">contact@impresario-global.com</a></p>
                    </div>
                </div>
                <Footer/>
            </div>
        </CommonLayout>
    );
}

export function ErrorBoundary() {
    return <AppError/>;
}
