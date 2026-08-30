import SelectorRouteDemo from './SelectorRouteDemo'

const OPTIONS = [
  { key: 'email', icon: '📧', label: 'email', result: 'new EmailNotification()', note: "NotificationFactory.create('email') instancie EmailNotification, sans que le code appelant écrive `new` lui-même." },
  { key: 'sms', icon: '📱', label: 'sms', result: 'new SmsNotification()', note: "NotificationFactory.create('sms') instancie SmsNotification — même appel, classe différente selon le type." },
]

function FactoryDemo() {
  return (
    <SelectorRouteDemo
      hint="Choisis un type de notification : la Factory décide quelle classe instancier."
      options={OPTIONS}
      placeholder="Clique un type pour voir quelle classe concrète est créée."
    />
  )
}

export default FactoryDemo
