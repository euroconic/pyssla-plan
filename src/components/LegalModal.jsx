import React from 'react';
import { X } from 'lucide-react';

const LegalModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-800">Privacy, Safety & Legal</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 text-sm text-gray-700 leading-relaxed">

          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">About Pyssla Plan</h3>
            <p>
              Pyssla Plan is a free, open-source pattern builder for IKEA Pyssla and Hama beads.
              It is designed for children aged 4-10, used under parental or caregiver supervision.
              The app runs entirely in your browser - no accounts, no sign-ups, no cloud storage.
            </p>
          </section>

          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">Age & Supervision</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Recommended age:</strong> 4-10 years old</li>
              <li><strong>Parental supervision required.</strong> This app is intended for use by children accompanied by a parent, caregiver, or teacher.</li>
              <li>Children under 13 should not use this app unsupervised (per COPPA guidelines).</li>
              <li>The app does not collect any personal information from children.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">Screen Time Recommendations</h3>
            <p>We encourage healthy digital habits. Based on WHO and pediatric guidelines:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Ages 4-5:</strong> No more than 1 hour of screen time per day</li>
              <li><strong>Ages 6-10:</strong> Consistent limits on screen time, balanced with physical activity</li>
              <li><strong>Suggested session:</strong> 15-30 minutes of digital planning, then switch to physical bead placement</li>
              <li>This app is designed as a <strong>planning tool</strong>, not a replacement for the physical craft. The goal is to move from screen to pegboard quickly.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">Privacy Policy</h3>

            <h4 className="font-semibold text-gray-800 mt-3">What we collect</h4>
            <p>We use <strong>Microsoft Clarity</strong> for anonymous usage analytics. Clarity collects:</p>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li>Anonymous session recordings (mouse movements, clicks, scrolls)</li>
              <li>Heatmaps showing where users click on the page</li>
              <li>Device type, browser, screen size (no IP addresses stored)</li>
              <li>Custom event tags: save, load, print, board change, clear, rename</li>
            </ul>

            <h4 className="font-semibold text-gray-800 mt-3">What we do NOT collect</h4>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li>No names, emails, or personal information</li>
              <li>No photos or images of children</li>
              <li>No location data</li>
              <li>No account or login data (there are no accounts)</li>
              <li>No advertising or third-party marketing trackers</li>
            </ul>

            <h4 className="font-semibold text-gray-800 mt-3">Cookies</h4>
            <p>
              Microsoft Clarity uses first-party cookies to distinguish between sessions.
              These cookies do not identify individual users and contain no personal information.
              No third-party advertising cookies are used.
            </p>

            <h4 className="font-semibold text-gray-800 mt-3">Data storage</h4>
            <p>
              All pattern data (drawings, names) is stored <strong>only on your device</strong>.
              When you save a pattern, it downloads as a file to your computer.
              Nothing is uploaded to any server.
              Microsoft Clarity data is processed by Microsoft under their{' '}
              <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">privacy policy</a>.
            </p>
          </section>

          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">COPPA & GDPR Compliance</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>This app does not knowingly collect personal information from children under 13 (COPPA) or under 16 (GDPR).</li>
              <li>No account creation, no email collection, no user-generated content is uploaded.</li>
              <li>Analytics are anonymous and aggregated - individual children cannot be identified.</li>
              <li>Parents may opt out of Clarity analytics by using a browser ad-blocker or disabling JavaScript.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">Physical Safety</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Small parts warning:</strong> Pyssla/Hama beads are small parts and pose a choking hazard for children under 3 years old.</li>
              <li><strong>Ironing:</strong> Fusing beads with an iron must be done by an adult only.</li>
              <li>This app only produces digital patterns and paper templates. The physical crafting activity requires age-appropriate supervision.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">Disclaimers</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Pyssla Plan is not affiliated with, endorsed by, or sponsored by IKEA, Hama, or any bead manufacturer.</li>
              <li>IKEA and Pyssla are trademarks of Inter IKEA Systems B.V. Hama is a trademark of Hama A/S.</li>
              <li>This app is provided "as is" without warranty of any kind. The developer is not liable for any damages arising from its use.</li>
              <li>Print accuracy (1:1 scale) depends on your browser and printer settings. Always verify with a physical pegboard before placing beads.</li>
              <li>The app is open-source under the terms specified in the repository.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">Contact</h3>
            <p>
              For privacy concerns or questions, contact the developer via{' '}
              <a href="https://github.com/euroconic/pyssla-plan/issues" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">GitHub Issues</a>.
            </p>
          </section>

          <p className="text-xs text-gray-400 pt-2 border-t">Last updated: April 10, 2026</p>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
