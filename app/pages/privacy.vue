<script setup lang="ts">
const { getSiteTitle, getVolunteerEmail } = useConfig()
const siteTitle = computed(() => getSiteTitle())
const volunteerEmail = computed(() => getVolunteerEmail())

const { getFullSiteTitle, getOpenGraphUrl, lguName } = useConfig()

const seoDesc = computed(() => `Privacy Policy of ${lguName.value}. Learn how we protect, collect, and use your personal information when using our digital government services.`)

useHead({
  title: 'Privacy Policy',
})

useSeoMeta({
  description: () => seoDesc.value,
  ogTitle: () => getFullSiteTitle('Privacy Policy'),
  ogDescription: () => seoDesc.value,
  ogType: 'website',
  ogUrl: () => `${getOpenGraphUrl()}privacy`,
  twitterCard: 'summary',
  twitterTitle: () => getFullSiteTitle('Privacy Policy'),
  twitterDescription: () => seoDesc.value,
})

const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'legal-basis', title: 'Legal Basis' },
  { id: 'information-collected', title: 'Information We Collect' },
  { id: 'how-we-use', title: 'How We Use Information' },
  { id: 'cookies', title: 'Cookies & Analytics' },
  { id: 'data-sharing', title: 'Data Sharing' },
  { id: 'data-security', title: 'Data Security' },
  { id: 'data-retention', title: 'Data Retention' },
  { id: 'your-rights', title: 'Your Rights' },
  { id: 'childrens-privacy', title: 'Children\'s Privacy' },
  { id: 'third-party', title: 'Third-Party Links' },
  { id: 'changes', title: 'Policy Changes' },
  { id: 'contact', title: 'Contact Us' },
]
</script>

<template>
  <div>
    <!-- Breadcrumbs -->
    <UiBreadcrumbs :items="[{ label: 'Privacy Policy' }]" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto">
          <span
            class="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <i class="bi bi-shield-lock" /> Privacy
          </span>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p class="text-lg text-white/90">
            How we collect, use, and protect your information
          </p>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Table of Contents -->
          <aside class="lg:w-64 shrink-0">
            <div
              class="sticky top-24 bg-white border border-gray-200 rounded-xl p-6"
            >
              <h4
                class="font-semibold text-gray-900 mb-4 flex items-center gap-2"
              >
                <i class="bi bi-list-ul" /> Contents
              </h4>
              <nav class="space-y-2 text-sm">
                <a
                  v-for="section in sections"
                  :key="section.id"
                  :href="`#${section.id}`"
                  class="block text-gray-600 hover:text-primary-600 transition-colors"
                >
                  {{ section.title }}
                </a>
              </nav>
            </div>
          </aside>

          <!-- Main Content -->
          <article class="flex-1 max-w-3xl">
            <div class="space-y-8">
              <section
                id="introduction"
                class="bg-white border border-gray-200 rounded-xl p-8"
              >
                <h2 class="text-xl font-bold text-gray-900 mb-4">
                  Introduction
                </h2>
                <p class="text-gray-600 mb-4">
                  {{ siteTitle }} ("we," "us," or "our") is committed to
                  protecting your privacy and ensuring the security of your
                  personal information. This Privacy Policy explains how we
                  collect, use, disclose, and safeguard your information
                  when you visit our website.
                </p>
                <p class="text-gray-600 mb-4">
                  This policy is designed to comply with the
                  <strong>
                    Data Privacy Act of 2012 (Republic Act No. 10173)
                  </strong>
                  of the Philippines and its Implementing Rules and
                  Regulations (IRR).
                </p>
                <div
                  class="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <i
                    class="bi bi-shield-check text-2xl text-green-600"
                  />
                  <span class="text-green-800">
                    We are committed to <strong>transparency</strong> and
                    <strong>data minimization</strong> — we only collect
                    what is necessary.
                  </span>
                </div>
              </section>

              <section
                id="legal-basis"
                class="bg-white border border-gray-200 rounded-xl p-8"
              >
                <h2 class="text-xl font-bold text-gray-900 mb-4">
                  Legal Basis for Processing
                </h2>
                <p class="text-gray-600 mb-4">
                  Under the Data Privacy Act of 2012, we process personal
                  information based on the following lawful criteria:
                </p>
                <ul class="space-y-2 text-gray-600">
                  <li>
                    <strong>Consent:</strong> When you voluntarily provide
                    information through contact forms or email
                    communications
                  </li>
                  <li>
                    <strong>Legitimate Interest:</strong> To improve our
                    website, ensure security, and provide better civic
                    services
                  </li>
                  <li>
                    <strong>Legal Obligation:</strong> When required by
                    Philippine law or government authorities
                  </li>
                  <li>
                    <strong>Public Interest:</strong> To promote
                    transparency and civic engagement in local governance
                  </li>
                </ul>
              </section>

              <section
                id="information-collected"
                class="bg-white border border-gray-200 rounded-xl p-8"
              >
                <h2 class="text-xl font-bold text-gray-900 mb-4">
                  Information We Collect
                </h2>
                <h3 class="font-semibold text-gray-800 mt-4 mb-2">
                  Information You Provide Voluntarily
                </h3>
                <ul
                  class="list-disc list-inside space-y-1 text-gray-600 mb-4"
                >
                  <li>
                    Email address (when you contact us or submit feedback)
                  </li>
                  <li>Name (if provided in correspondence)</li>
                  <li>Message content and inquiries</li>
                </ul>
                <h3 class="font-semibold text-gray-800 mt-4 mb-2">
                  Information Collected Automatically
                </h3>
                <ul class="list-disc list-inside space-y-1 text-gray-600">
                  <li>IP address (anonymized where possible)</li>
                  <li>Browser type and version</li>
                  <li>Device type and operating system</li>
                  <li>Pages visited and time spent on pages</li>
                </ul>
              </section>

              <section
                id="how-we-use"
                class="bg-white border border-gray-200 rounded-xl p-8"
              >
                <h2 class="text-xl font-bold text-gray-900 mb-4">
                  How We Use Your Information
                </h2>
                <ul class="list-disc list-inside space-y-1 text-gray-600">
                  <li>To respond to your inquiries and feedback</li>
                  <li>
                    To improve website functionality and user experience
                  </li>
                  <li>To analyze website traffic and usage patterns</li>
                  <li>To ensure website security and prevent abuse</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section
                id="cookies"
                class="bg-white border border-gray-200 rounded-xl p-8"
              >
                <h2 class="text-xl font-bold text-gray-900 mb-4">
                  Cookies and Analytics
                </h2>
                <p class="text-gray-600 mb-4">
                  We use cookies and similar technologies to enhance your
                  browsing experience. We use Google Analytics to collect
                  anonymized data about website usage.
                </p>
              </section>

              <section
                id="data-sharing"
                class="bg-white border border-gray-200 rounded-xl p-8"
              >
                <h2 class="text-xl font-bold text-gray-900 mb-4">
                  Data Sharing and Disclosure
                </h2>
                <p class="text-gray-600">
                  We do not sell, trade, or rent your personal information
                  to third parties. We may share information only with
                  service providers, when required by law, or with your
                  explicit consent.
                </p>
              </section>

              <section
                id="data-security"
                class="bg-white border border-gray-200 rounded-xl p-8"
              >
                <h2 class="text-xl font-bold text-gray-900 mb-4">
                  Data Security
                </h2>
                <p class="text-gray-600">
                  We implement appropriate technical and organizational
                  measures to protect your personal information, including
                  SSL/TLS encryption, secure hosting infrastructure, and
                  regular security assessments.
                </p>
              </section>

              <section
                id="data-retention"
                class="bg-white border border-gray-200 rounded-xl p-8"
              >
                <h2 class="text-xl font-bold text-gray-900 mb-4">
                  Data Retention
                </h2>
                <p class="text-gray-600">
                  We retain personal information only for as long as
                  necessary. Contact information is deleted within 1 year of
                  last contact. Server logs are automatically deleted after
                  90 days.
                </p>
              </section>

              <section
                id="your-rights"
                class="bg-white border border-gray-200 rounded-xl p-8"
              >
                <h2 class="text-xl font-bold text-gray-900 mb-4">
                  Your Rights Under the Data Privacy Act
                </h2>
                <ul
                  class="list-disc list-inside space-y-1 text-gray-600 mb-4"
                >
                  <li>
                    <strong>Right to Be Informed</strong>
                  </li>
                  <li>
                    <strong>Right to Access</strong>
                  </li>
                  <li>
                    <strong>Right to Object</strong>
                  </li>
                  <li>
                    <strong>Right to Erasure or Blocking</strong>
                  </li>
                  <li>
                    <strong>Right to Rectification</strong>
                  </li>
                  <li>
                    <strong>Right to Data Portability</strong>
                  </li>
                  <li>
                    <strong>Right to File a Complaint</strong>
                  </li>
                </ul>
                <p class="text-gray-600">
                  To exercise any of these rights, please contact us at
                  <a
                    :href="`mailto:${volunteerEmail}`"
                    class="text-primary-600 hover:underline"
                  >
                    {{ volunteerEmail }}
                  </a>
                  .
                </p>
              </section>

              <section
                id="childrens-privacy"
                class="bg-white border border-gray-200 rounded-xl p-8"
              >
                <h2 class="text-xl font-bold text-gray-900 mb-4">
                  Children's Privacy
                </h2>
                <p class="text-gray-600">
                  We do not knowingly collect personal information from
                  children under 18 years of age without parental consent.
                </p>
              </section>

              <section
                id="third-party"
                class="bg-white border border-gray-200 rounded-xl p-8"
              >
                <h2 class="text-xl font-bold text-gray-900 mb-4">
                  Third-Party Links
                </h2>
                <p class="text-gray-600">
                  Our website may contain links to external websites. We are
                  not responsible for the privacy practices of these
                  third-party sites.
                </p>
              </section>

              <section
                id="changes"
                class="bg-white border border-gray-200 rounded-xl p-8"
              >
                <h2 class="text-xl font-bold text-gray-900 mb-4">
                  Changes to This Privacy Policy
                </h2>
                <p class="text-gray-600">
                  We may update this Privacy Policy from time to time. The
                  "Last Updated" date at the bottom of this page will be
                  revised when changes are made.
                </p>
              </section>

              <section
                id="contact"
                class="bg-white border border-gray-200 rounded-xl p-8"
              >
                <h2 class="text-xl font-bold text-gray-900 mb-4">
                  Contact Us
                </h2>
                <p class="text-gray-600 mb-4">
                  If you have questions about this Privacy Policy, please
                  contact us:
                </p>
                <a
                  :href="`mailto:${volunteerEmail}`"
                  class="inline-flex items-center gap-3 p-4 bg-primary-50 border border-primary-200 rounded-xl text-primary-700 font-medium hover:bg-primary-100 transition-colors"
                >
                  <i class="bi bi-envelope-fill text-xl" />
                  <span>{{ volunteerEmail }}</span>
                </a>
              </section>

              <p class="text-sm text-gray-400">
                Last Updated: February 19, 2026
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
